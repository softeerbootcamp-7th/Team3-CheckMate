package com.checkmate.backend.domain.member.controller;

import com.checkmate.backend.domain.member.dto.AuthToken;
import com.checkmate.backend.domain.member.dto.LoginResponse;
import com.checkmate.backend.domain.member.service.MemberService;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.exception.UnauthorizedException;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.ErrorStatus;
import com.checkmate.backend.global.response.SuccessStatus;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

// TODO: 로그인 state 검증 로직 추가
@Tag(name = "Auth", description = "인증/로그인 관련 API 입니다.")
@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.redirect-uri}")
    private String redirectUri;

    @Value("${google.client.authorization-uri}")
    private String authorizationUri;

    @Value("${jwt.refresh.expiration}")
    private long refreshTokenExpiration; // ms 단위

    private final MemberService memberService;

    @Operation(
            summary = "구글 로그인 리다이렉트 API",
            description = "구글 로그인 페이지로 리다이렉트합니다. (redirect_url 파라미터는 선택사항)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "302",
                description = "구글 로그인 페이지로 리다이렉트 성공"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다.")
    })
    @GetMapping("/google")
    public String redirectToGoogle(
            @RequestParam(required = false) String redirect_url, HttpSession session) {
        String scope = "openid email profile https://www.googleapis.com/auth/gmail.send";
        //        String state = UUID.randomUUID().toString();

        //        session.setAttribute("oauth_state", state);

        //        log.info("Google Login Redirect Requested. Generated State: {}", state);

        String clientRedirectUrl =
                redirect_url != null && !redirect_url.isEmpty() ? redirect_url : redirectUri;

        UriComponents builder =
                UriComponentsBuilder.fromUriString(authorizationUri)
                        .queryParam("client_id", clientId)
                        .queryParam("redirect_uri", clientRedirectUrl)
                        .queryParam("response_type", "code")
                        .queryParam("scope", scope)
                        //                        .queryParam("state", state)
                        .queryParam("access_type", "offline")
                        .queryParam("prompt", "consent")
                        .build();

        return "redirect:" + builder.toUriString();
    }

    @Operation(
            summary = "구글 로그인 콜백 API",
            description = "구글 인증 코드를 받아 액세스 토큰을 발급하고, 리프레시 토큰을 쿠키에 설정합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "구글 로그인에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "유효하지 않은 OAuth state 파라미터입니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "유효하지 않은 ID 토큰입니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "구글 토큰 교환에 실패했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "ID 토큰 검증에 실패했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다.")
    })
    @GetMapping("/google/callback")
    @ResponseBody
    public ResponseEntity<ApiResponse<LoginResponse>> handleGoogleCallback(
            @RequestParam String code,
            //            @RequestParam String state,
            @RequestParam(required = false) String redirect_url,
            HttpSession session) {
        //        validateState(state, session);

        GoogleTokenResponse googleTokenResponse =
                memberService.exchangeCodeForToken(code, redirect_url);
        String email = memberService.extractEmailFromToken(googleTokenResponse.getIdToken());

        AuthToken authToken = memberService.processLoginTransaction(email, googleTokenResponse);

        // 리프레시 토큰 HttpOnly 쿠키로 생성
        ResponseCookie refreshTokenCookie =
                ResponseCookie.from("refresh_token", authToken.refreshToken())
                        .httpOnly(true) // JS 접근 불가 (XSS 방어)
                        .secure(true) // HTTPS 전송 (로컬 테스트 시 http 환경이면 false로 변경 필요할 수 있음)
                        .path("/")
                        .maxAge(refreshTokenExpiration / 1000) // 초 단위
                        .sameSite("None") // 크로스 사이트 요청 허용
                        .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(
                        ApiResponse.createSuccess(
                                SuccessStatus.GOOGLE_LOGIN_SUCCESS,
                                new LoginResponse(authToken.accessToken())));
    }

    @Operation(summary = "액세스 토큰 재발행 API", description = "리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "액세스 토큰 재발행에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "401",
                description = "리프레시 토큰이 존재하지 않습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "401",
                description = "유효하지 않은 리프레시 토큰입니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "401",
                description = "만료된 리프레시 토큰입니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "401",
                description = "저장된 리프레시 토큰과 일치하지 않습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "해당 사용자를 찾을 수 없습니다.")
    })
    @GetMapping("/refresh")
    @ResponseBody
    public ResponseEntity<ApiResponse<LoginResponse>> refreshAccessToken(
            @CookieValue(value = "refresh_token", required = false) String refreshToken) {

        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new UnauthorizedException(ErrorStatus.REFRESH_TOKEN_NOT_FOUND);
        }

        String newAccessToken = memberService.refreshAccessToken(refreshToken);

        return ResponseEntity.ok()
                .body(
                        ApiResponse.createSuccess(
                                SuccessStatus.TOKEN_REFRESH_SUCCESS,
                                new LoginResponse(newAccessToken)));
    }

    private void validateState(String state, HttpSession session) {
        String savedState = (String) session.getAttribute("oauth_state");
        if (savedState == null || !savedState.equals(state)) {
            throw new BadRequestException(ErrorStatus.INVALID_OAUTH_STATE);
        }
        session.removeAttribute("oauth_state");
    }
}
