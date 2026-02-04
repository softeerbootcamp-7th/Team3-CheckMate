package com.checkmate.backend.domain.member.service;

import static com.checkmate.backend.domain.member.entity.MemberAuth.createWithMember;

import com.checkmate.backend.domain.member.dto.AuthToken;
import com.checkmate.backend.domain.member.entity.Member;
import com.checkmate.backend.domain.member.entity.MemberAuth;
import com.checkmate.backend.domain.member.repository.MemberAuthRepository;
import com.checkmate.backend.domain.member.repository.MemberRepository;
import com.checkmate.backend.global.auth.oidc.OidcService;
import com.checkmate.backend.global.exception.InternalServerException;
import com.checkmate.backend.global.exception.NotFoundException;
import com.checkmate.backend.global.exception.UnauthorizedException;
import com.checkmate.backend.global.response.ErrorStatus;
import com.checkmate.backend.global.util.JwtUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.client.redirect-uri}")
    private String redirectUri;

    private final MemberRepository memberRepository;
    private final MemberAuthRepository memberAuthRepository;
    private final OidcService oidcService;
    private final JwtUtil jwtUtil;

    private final NetHttpTransport httpTransport;
    private final JsonFactory jsonFactory;

    private static final int MAX_RETRY_ATTEMPTS = 3;
    private static final long RETRY_DELAY_MS = 1000;

    @Transactional
    public AuthToken processLoginTransaction(
            String email, GoogleTokenResponse googleTokenResponse) {
        Member member =
                memberRepository
                        .findWithStoreByEmail(email)
                        .orElseGet(
                                () -> {
                                    Member newMember = new Member(email);
                                    return memberRepository.save(newMember);
                                });

        Long storeId = (member.getStore() != null) ? member.getStore().getId() : null;

        // JWT 토큰 생성
        String accessToken = jwtUtil.generateAccessToken(member.getId(), storeId);
        String refreshToken = jwtUtil.generateRefreshToken(member.getId());

        // MemberAuth 저장 또는 업데이트
        saveOrUpdateMemberAuth(member, googleTokenResponse, refreshToken);

        return new AuthToken(accessToken, refreshToken);
    }

    // 재시도 로직이 포함된 Google Token 교환
    public GoogleTokenResponse exchangeCodeForToken(String code, String redirectUrl) {
        String clientRedirectUrl =
                redirectUrl != null && !redirectUrl.isEmpty() ? redirectUrl : redirectUri;

        int attempt = 0;
        IOException lastException = null;

        while (attempt < MAX_RETRY_ATTEMPTS) {
            try {
                attempt++;
                log.debug(
                        "Attempting to exchange auth code for Google tokens... (Attempt {}/{})",
                        attempt,
                        MAX_RETRY_ATTEMPTS);

                GoogleTokenResponse response =
                        new GoogleAuthorizationCodeTokenRequest(
                                        httpTransport,
                                        jsonFactory,
                                        "https://oauth2.googleapis.com/token",
                                        clientId,
                                        clientSecret,
                                        code,
                                        clientRedirectUrl)
                                .execute();

                log.debug("Google token exchange successful on attempt {}", attempt);
                return response;

            } catch (IOException e) {
                lastException = e;
                log.warn(
                        "Failed to exchange code for Google token on attempt {}/{}. Error: {}",
                        attempt,
                        MAX_RETRY_ATTEMPTS,
                        e.getMessage());

                if (attempt < MAX_RETRY_ATTEMPTS) {
                    try {
                        Thread.sleep(RETRY_DELAY_MS * attempt);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new InternalServerException(ErrorStatus.GOOGLE_TOKEN_EXCHANGE_FAILED);
                    }
                }
            }
        }

        log.error(
                "Failed to exchange code for Google token after {} attempts. Last error: {}",
                MAX_RETRY_ATTEMPTS,
                lastException.getMessage(),
                lastException);
        throw new InternalServerException(ErrorStatus.GOOGLE_TOKEN_EXCHANGE_FAILED);
    }

    @Transactional(readOnly = true)
    public String refreshAccessToken(String refreshToken) {
        // 리프레시 토큰 검증
        jwtUtil.validateRefreshToken(refreshToken);

        // 리프레시 토큰에서 사용자 ID 추출
        Long memberId = jwtUtil.getUserIdFromToken(refreshToken);

        // DB에 저장된 리프레시 토큰과 비교
        Member member =
                memberRepository
                        .findById(memberId)
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                ErrorStatus.MEMBER_NOT_FOUND_EXCEPTION));

        MemberAuth memberAuth =
                memberAuthRepository
                        .findByMember(member)
                        .orElseThrow(
                                () ->
                                        new UnauthorizedException(
                                                ErrorStatus.REFRESH_TOKEN_NOT_FOUND));

        if (!refreshToken.equals(memberAuth.getRefreshToken())) {
            log.warn("Refresh token mismatch for member: {}", memberId);
            throw new UnauthorizedException(ErrorStatus.REFRESH_TOKEN_MISMATCH);
        }

        // 새로운 액세스 토큰 생성
        Long storeId = (member.getStore() != null) ? member.getStore().getId() : null;

        return jwtUtil.generateAccessToken(memberId, storeId);
    }

    public String extractEmailFromToken(String idToken) {
        log.debug("Verifying ID Token and extracting email...");
        GoogleIdToken.Payload payload = oidcService.verifyIdToken(idToken);
        return payload.getEmail();
    }

    private void saveOrUpdateMemberAuth(
            Member member, GoogleTokenResponse googleTokenResponse, String jwtRefreshToken) {

        MemberAuth memberAuth =
                memberAuthRepository.findByMember(member).orElseGet(() -> createWithMember(member));

        String googleAccessToken = googleTokenResponse.getAccessToken();
        String googleRefreshToken = googleTokenResponse.getRefreshToken();

        if (googleRefreshToken != null) {
            // Google Refresh Token이 새로 발급된 경우에만 업데이트
            memberAuth.updateGoogleTokens(googleAccessToken, googleRefreshToken);
            log.debug("Updated Google tokens for member: {}", member.getEmail());
        } else {
            memberAuth.updateGoogleAccessToken(googleAccessToken);
            log.debug(
                    "Google Refresh Token is null (already issued), updated only Access Token for member: {}",
                    member.getEmail());
        }

        // JWT Refresh Token 업데이트
        memberAuth.updateRefreshToken(jwtRefreshToken);

        memberAuthRepository.save(memberAuth);
    }
}
