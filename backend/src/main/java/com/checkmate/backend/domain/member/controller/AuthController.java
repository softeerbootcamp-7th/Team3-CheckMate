package com.checkmate.backend.domain.member.controller;

import com.checkmate.backend.domain.member.dto.AuthToken;
import com.checkmate.backend.domain.member.dto.LoginResponse;
import com.checkmate.backend.domain.member.service.MemberService;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.ErrorStatus;
import com.checkmate.backend.global.response.SuccessStatus;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import jakarta.servlet.http.HttpSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.client.redirect-uri}")
    private String redirectUri;

    @Value("${google.client.authorization-uri}")
    private String authorizationUri;

    private final MemberService memberService;

    @GetMapping("/google")
    public String redirectToGoogle(HttpSession session) {
        String scope = "openid email profile https://www.googleapis.com/auth/gmail.send";
        String state = UUID.randomUUID().toString();

        session.setAttribute("oauth_state", state);

        log.info("Google Login Redirect Requested. Generated State: {}", state);

        UriComponents builder =
                UriComponentsBuilder.fromUriString(authorizationUri)
                        .queryParam("client_id", clientId)
                        .queryParam("redirect_uri", redirectUri)
                        .queryParam("response_type", "code")
                        .queryParam("scope", scope)
                        .queryParam("state", state)
                        .queryParam("access_type", "offline")
                        .queryParam("prompt", "consent")
                        .build();

        return "redirect:" + builder.toUriString();
    }

    @GetMapping("/google/callback")
    @ResponseBody
    public ResponseEntity<ApiResponse<LoginResponse>> handleGoogleCallback(
            @RequestParam String code, @RequestParam String state, HttpSession session) {
        validateState(state, session);

        GoogleTokenResponse googleTokenResponse = memberService.exchangeCodeForToken(code);
        String email = memberService.extractEmailFromToken(googleTokenResponse.getIdToken());

        AuthToken authToken = memberService.processLoginTransaction(email, googleTokenResponse);

        // 리프레시 토큰 HttpOnly 쿠키로 생성
        ResponseCookie refreshTokenCookie =
                ResponseCookie.from("refresh_token", authToken.refreshToken())
                        .httpOnly(true) // JS 접근 불가 (XSS 방어)
                        .secure(true) // HTTPS 전송 (로컬 테스트 시 http 환경이면 false로 변경 필요할 수 있음)
                        .path("/")
                        .maxAge(7 * 24 * 60 * 60)
                        .sameSite("None") // 크로스 사이트 요청 허용
                        .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(
                        ApiResponse.createSuccess(
                                SuccessStatus.GOOGLE_LOGIN_SUCCESS,
                                new LoginResponse(authToken.accessToken())));
    }

    private void validateState(String state, HttpSession session) {
        String savedState = (String) session.getAttribute("oauth_state");
        if (savedState == null || !savedState.equals(state)) {
            throw new BadRequestException(ErrorStatus.INVALID_OAUTH_STATE);
        }
        session.removeAttribute("oauth_state");
    }
}
