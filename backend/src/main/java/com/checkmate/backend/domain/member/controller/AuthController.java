package com.checkmate.backend.domain.member.controller;

import com.checkmate.backend.domain.member.dto.AuthToken;
import com.checkmate.backend.domain.member.dto.LoginResponse;
import com.checkmate.backend.domain.member.dto.MemberStatusResponse;
import com.checkmate.backend.domain.member.service.MemberService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.ErrorStatus;
import com.checkmate.backend.global.response.SuccessStatus;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
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
            summary = "구글 로그인 리다이렉트 API (한울)",
            description = "구글 로그인 페이지로 리다이렉트합니다. (redirect_url 파라미터는 선택사항)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "302",
                description = "구글 로그인 페이지로 리다이렉트 성공"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다.",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "서버 내부 오류",
                                                summary = "예상치 못한 서버 오류",
                                                value =
                                                        "{ \"success\": false, \"message\": \"서버 내부 오류가 발생했습니다.\", \"errorCode\": \"INTERNAL_SERVER_EXCEPTION\" }")))
    })
    @GetMapping("/google")
    public String redirectToGoogle(
            @RequestParam(required = false) String redirectUrl, HttpSession session) {
        String scope = "openid email profile"
                //                + " https://www.googleapis.com/auth/gmail.send"
                ;
        //        String state = UUID.randomUUID().toString();

        //        session.setAttribute("oauth_state", state);

        //        log.info("Google Login Redirect Requested. Generated State: {}", state);

        String clientRedirectUrl =
                redirectUrl != null && !redirectUrl.isEmpty() ? redirectUrl : redirectUri;

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
            summary = "구글 로그인 콜백 API (한울)",
            description = "구글 인증 코드를 받아 액세스 토큰을 발급하고, 리프레시 토큰을 쿠키에 설정합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "구글 로그인 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{ \"success\": true, \"message\": \"구글 로그인에 성공했습니다.\", \"data\": { \"accessToken\": \"eyJ...\" } }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "클라이언트 요청 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "유효하지 않은 OAuth state",
                                            summary = "OAuth state 파라미터 검증 실패",
                                            value =
                                                    "{ \"success\": false, \"message\": \"유효하지 않은 OAuth state 파라미터입니다.\", \"errorCode\": \"INVALID_OAUTH_STATE\" }"),
                                    @ExampleObject(
                                            name = "유효하지 않은 ID 토큰",
                                            summary = "ID 토큰 형식 또는 내용 오류",
                                            value =
                                                    "{ \"success\": false, \"message\": \"유효하지 않은 ID 토큰입니다.\", \"errorCode\": \"INVALID_ID_TOKEN\" }")
                                })),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "구글 토큰 교환 실패",
                                            summary = "구글 인증 코드 -> 토큰 교환 과정 실패",
                                            value =
                                                    "{ \"success\": false, \"message\": \"구글 토큰 교환에 실패했습니다.\", \"errorCode\": \"GOOGLE_TOKEN_EXCHANGE_FAILED\" }"),
                                    @ExampleObject(
                                            name = "ID 토큰 검증 실패",
                                            summary = "구글로부터 받은 ID 토큰 검증 실패",
                                            value =
                                                    "{ \"success\": false, \"message\": \"ID 토큰 검증에 실패했습니다.\", \"errorCode\": \"ID_TOKEN_VERIFICATION_FAILED\" }"),
                                    @ExampleObject(
                                            name = "일반 서버 내부 오류",
                                            summary = "예상치 못한 서버 오류",
                                            value =
                                                    "{ \"success\": false, \"message\": \"서버 내부 오류가 발생했습니다.\", \"errorCode\": \"INTERNAL_SERVER_EXCEPTION\" }")
                                }))
    })
    @GetMapping("/google/callback")
    @ResponseBody
    public ResponseEntity<ApiResponse<LoginResponse>> handleGoogleCallback(
            @RequestParam String code,
            //            @RequestParam String state,
            @RequestParam(required = false) String redirectUrl,
            HttpSession session) {
        //        validateState(state, session);

        GoogleTokenResponse googleTokenResponse =
                memberService.exchangeCodeForToken(code, redirectUrl);
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

    @Operation(summary = "액세스 토큰 재발행 API (한울)", description = "리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "토큰 재발급 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{ \"success\": true, \"message\": \"토큰 재발급에 성공했습니다.\", \"data\": { \"accessToken\": \"eyJ...\" } }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "401",
                description = "인증 실패 (토큰 오류)",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "토큰 누락",
                                            summary = "리프레시 토큰 없음",
                                            value =
                                                    "{ \"success\": false, \"message\": \"리프레시 토큰이 존재하지 않습니다.\", \"errorCode\": \"REFRESH_TOKEN_NOT_FOUND\" }"),
                                    @ExampleObject(
                                            name = "토큰 불일치",
                                            summary = "저장된 토큰과 다름",
                                            value =
                                                    "{ \"success\": false, \"message\": \"저장된 리프레시 토큰과 일치하지 않습니다.\", \"errorCode\": \"REFRESH_TOKEN_MISMATCH\" }"),
                                    @ExampleObject(
                                            name = "유효하지 않은 토큰",
                                            summary = "토큰 형식이 잘못됨",
                                            value =
                                                    "{ \"success\": false, \"message\": \"유효하지 않은 리프레시 토큰입니다.\", \"errorCode\": \"INVALID_REFRESH_TOKEN\" }"),
                                    @ExampleObject(
                                            name = "토큰 만료",
                                            summary = "리프레시 토큰 기한 만료",
                                            value =
                                                    "{ \"success\": false, \"message\": \"만료된 리프레시 토큰입니다.\", \"errorCode\": \"EXPIRED_REFRESH_TOKEN\" }")
                                })),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "사용자 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "대상 미존재",
                                                summary = "해당 사용자를 찾을 수 없음",
                                                value =
                                                        "{ \"success\": false, \"message\": \"해당 사용자를 찾을 수 없습니다.\", \"errorCode\": \"MEMBER_NOT_FOUND_EXCEPTION\" }")))
    })
    @PostMapping("/refresh")
    @ResponseBody
    public ResponseEntity<ApiResponse<LoginResponse>> refreshAccessToken(
            @Parameter(hidden = true) @CookieValue(value = "refresh_token", required = false)
                    String refreshToken) {
        String newAccessToken = memberService.refreshAccessToken(refreshToken);

        return ResponseEntity.ok()
                .body(
                        ApiResponse.createSuccess(
                                SuccessStatus.TOKEN_REFRESH_SUCCESS,
                                new LoginResponse(newAccessToken)));
    }

    @Operation(
            summary = "사용자 상태 조회 API (한울)",
            description = "현재 로그인한 사용자의 이메일, 매장 등록 여부, POS 연동 여부를 조회합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "사용자 상태 조회 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{ \"success\": true, \"message\": \"사용자 상태 조회에 성공했습니다.\", \"data\": { \"email\": \"user@example.com\", \"hasStore\": true, \"hasPosIntegration\": false } }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "조회 실패",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "사용자 없음",
                                                summary = "존재하지 않는 사용자",
                                                value =
                                                        "{ \"success\": false, \"message\": \"해당 사용자를 찾을 수 없습니다.\", \"errorCode\": \"MEMBER_NOT_FOUND_EXCEPTION\" }")))
    })
    @GetMapping("/status")
    @ResponseBody
    public ResponseEntity<ApiResponse<MemberStatusResponse>> getMemberStatus(
            @LoginMember MemberSession member) {
        MemberStatusResponse response = memberService.getMemberStatus(member.memberId());

        return ApiResponse.success(SuccessStatus.MEMBER_STATUS_SUCCESS, response);
    }

    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<ApiResponse<Void>> logout(@LoginMember MemberSession member) {
        memberService.logout(member.memberId());

        ResponseCookie cookie =
                ResponseCookie.from("refresh_token", "")
                        .httpOnly(true)
                        .secure(true)
                        .path("/")
                        .maxAge(0)
                        .sameSite("None")
                        .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(ApiResponse.createSuccess(SuccessStatus.LOGOUT_SUCCESS));
    }

    private void validateState(String state, HttpSession session) {
        String savedState = (String) session.getAttribute("oauth_state");
        if (savedState == null || !savedState.equals(state)) {
            throw new BadRequestException(ErrorStatus.INVALID_OAUTH_STATE);
        }
        session.removeAttribute("oauth_state");
    }
}
