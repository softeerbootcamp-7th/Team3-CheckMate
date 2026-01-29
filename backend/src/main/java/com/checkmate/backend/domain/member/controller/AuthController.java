package com.checkmate.backend.domain.member.controller;

import com.checkmate.backend.domain.member.dto.AuthResult;
import com.checkmate.backend.domain.member.service.MemberService;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.ErrorStatus;
import com.checkmate.backend.global.response.SuccessStatus;
import jakarta.servlet.http.HttpSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
                UriComponentsBuilder.fromHttpUrl(authorizationUri)
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
    public ResponseEntity<ApiResponse<AuthResult>> handleGoogleCallback(
            @RequestParam String code, @RequestParam String state, HttpSession session) {

        validateState(state, session);
        AuthResult authResult = memberService.processGoogleLogin(code);

        SuccessStatus status =
                authResult.isNewMember()
                        ? SuccessStatus.MEMBER_SIGNUP_SUCCESS
                        : SuccessStatus.GOOGLE_LOGIN_SUCCESS;

        return ApiResponse.success(status, authResult);
    }

    private void validateState(String state, HttpSession session) {
        String savedState = (String) session.getAttribute("oauth_state");
        if (savedState == null || !savedState.equals(state)) {
            throw new BadRequestException(ErrorStatus.INVALID_OAUTH_STATE);
        }
        session.removeAttribute("oauth_state");
    }
}
