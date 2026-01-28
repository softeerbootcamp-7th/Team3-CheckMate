package com.checkmate.backend.domain.member.controller;

import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.exception.InternalServerException;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.ErrorStatus;
import com.checkmate.backend.global.response.SuccessStatus;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;
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

  // 리다이렉트 응답
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

  // JSON 응답
  @GetMapping("/google/callback")
  @ResponseBody
  public ResponseEntity<ApiResponse<GoogleTokenResponse>> handleGoogleCallback(
      @RequestParam String code, @RequestParam String state, HttpSession session)
      throws IOException {

    log.info("Google Login Callback Received. State: {}", state);

    String savedState = (String) session.getAttribute("oauth_state");
    if (savedState == null || !savedState.equals(state)) {
      throw new BadRequestException(ErrorStatus.INVALID_OAUTH_STATE);
    }
    session.removeAttribute("oauth_state");

    try {
      GoogleTokenResponse tokenResponse =
          new GoogleAuthorizationCodeTokenRequest(
                  new NetHttpTransport(),
                  GsonFactory.getDefaultInstance(),
                  "https://oauth2.googleapis.com/token",
                  clientId,
                  clientSecret,
                  code,
                  redirectUri)
              .execute();

      log.info("Google Login Success.");
      log.debug("ID Token: {}", tokenResponse.getIdToken());
      log.debug("Access Token: {}", tokenResponse.getAccessToken());

      return ApiResponse.success(SuccessStatus.GOOGLE_LOGIN_SUCCESS, tokenResponse);

    } catch (Exception e) {
      log.error("Google token exchange failed", e);
      throw new InternalServerException(ErrorStatus.GOOGLE_TOKEN_EXCHANGE_FAILED);
    }
  }
}
