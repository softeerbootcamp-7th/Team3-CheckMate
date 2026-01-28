package com.checkmate.backend.domain.member.controller;

import com.checkmate.backend.domain.member.dto.GoogleTokenResponse;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.exception.InternalServerException;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.ErrorStatus;
import com.checkmate.backend.global.response.SuccessStatus;
import jakarta.servlet.http.HttpSession;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
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

  private final RestTemplate restTemplate = new RestTemplate();

  // 리다이렉트 응답
  @GetMapping("/google")
  public String redirectToGoogle(HttpSession session) {
    String scope = "openid email profile https://www.googleapis.com/auth/gmail.send";
    String state = UUID.randomUUID().toString();

    session.setAttribute("oauth_state", state);

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

  // JSON 응답
  @GetMapping("/google/callback")
  @ResponseBody
  public ResponseEntity<ApiResponse<GoogleTokenResponse>> handleGoogleCallback(
      @RequestParam String code, @RequestParam String state, HttpSession session) {

    String savedState = (String) session.getAttribute("oauth_state");
    if (savedState == null || !savedState.equals(state)) {
      throw new BadRequestException(ErrorStatus.INVALID_OAUTH_STATE);
    }
    session.removeAttribute("oauth_state");

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("code", code);
    params.add("client_id", clientId);
    params.add("client_secret", clientSecret);
    params.add("redirect_uri", redirectUri);
    params.add("grant_type", "authorization_code");

    GoogleTokenResponse tokenResponse =
        restTemplate.postForObject(
            "https://oauth2.googleapis.com/token", params, GoogleTokenResponse.class);

    if (tokenResponse == null) {
      throw new InternalServerException(ErrorStatus.GOOGLE_TOKEN_EXCHANGE_FAILED);
    }

    System.out.println("ID Token: " + tokenResponse.id_token());
    System.out.println("Access Token: " + tokenResponse.access_token());

    return ApiResponse.success(SuccessStatus.TEST_RESPONSE_SUCCESS, tokenResponse);
  }
}
