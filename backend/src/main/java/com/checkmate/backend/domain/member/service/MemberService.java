package com.checkmate.backend.domain.member.service;

import static com.checkmate.backend.domain.member.entity.MemberAuth.createWithMember;

import com.checkmate.backend.domain.member.dto.AuthResult;
import com.checkmate.backend.domain.member.entity.Member;
import com.checkmate.backend.domain.member.entity.MemberAuth;
import com.checkmate.backend.domain.member.repository.MemberAuthRepository;
import com.checkmate.backend.domain.member.repository.MemberRepository;
import com.checkmate.backend.global.auth.oidc.OidcService;
import com.checkmate.backend.global.exception.InternalServerException;
import com.checkmate.backend.global.response.ErrorStatus;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import java.io.IOException;
import java.util.Optional;
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

  private final NetHttpTransport httpTransport;
  private final JsonFactory jsonFactory;

  @Transactional
  public AuthResult processGoogleLogin(String code) {
    log.info("Processing Google Login. Code received (masked).");

    GoogleTokenResponse tokenResponse = exchangeCodeForToken(code);

    String email = extractEmailFromToken(tokenResponse.getIdToken());
    log.info("Google ID Token verified. User Email: {}", email);

    Optional<Member> existingMember = memberRepository.findByEmail(email);

    if (existingMember.isPresent()) {
      Member member = existingMember.get();
      log.info("Existing member login detected. Member ID: {}", member.getId());

      saveOrUpdateTokens(member, tokenResponse);
      return new AuthResult(member, tokenResponse, false);
    }

    log.info("New member detected. Initiating signup for: {}", email);
    Member newMember = memberRepository.save(new Member(email));
    log.info("New member saved. Member ID: {}", newMember.getId());

    saveOrUpdateTokens(newMember, tokenResponse);
    return new AuthResult(newMember, tokenResponse, true);
  }

  private GoogleTokenResponse exchangeCodeForToken(String code) {
    try {
      log.debug("Attempting to exchange auth code for Google tokens...");
      GoogleTokenResponse response =
          new GoogleAuthorizationCodeTokenRequest(
                  httpTransport,
                  jsonFactory,
                  "https://oauth2.googleapis.com/token",
                  clientId,
                  clientSecret,
                  code,
                  redirectUri)
              .execute();

      log.debug("Google token exchange successful.");
      return response;
    } catch (IOException e) {
      log.error("Failed to exchange code for Google token. Error: {}", e.getMessage(), e);
      throw new InternalServerException(ErrorStatus.GOOGLE_TOKEN_EXCHANGE_FAILED);
    }
  }

  private String extractEmailFromToken(String idToken) {
    log.debug("Verifying ID Token and extracting email...");
    GoogleIdToken.Payload payload = oidcService.verifyIdToken(idToken);
    return payload.getEmail();
  }

  private void saveOrUpdateTokens(Member member, GoogleTokenResponse tokenResponse) {
    log.debug("Updating Google tokens for Member ID: {}", member.getId());

    MemberAuth memberAuth =
        memberAuthRepository
            .findByMember(member)
            .orElseGet(
                () -> {
                  log.debug("No existing auth info found. Creating new MemberAuth.");
                  return createWithMember(member);
                });

    memberAuth.updateGoogleTokens(tokenResponse.getAccessToken(), tokenResponse.getRefreshToken());
    memberAuthRepository.save(memberAuth);
    log.debug("Tokens saved successfully.");
  }
}
