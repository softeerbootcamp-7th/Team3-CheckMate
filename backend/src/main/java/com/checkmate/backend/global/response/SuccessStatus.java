package com.checkmate.backend.global.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum SuccessStatus {

  /** Member */
  // 200
  GOOGLE_LOGIN_SUCCESS(HttpStatus.OK, "구글 로그인에 성공했습니다."),

  // 201
  MEMBER_SIGNUP_SUCCESS(HttpStatus.CREATED, "회원 가입에 성공했습니다"),

  /** Store */
  // 200

  // 201
  STORE_CREATE_SUCCESS(HttpStatus.CREATED, "매장 등록 성공");

  private final HttpStatus httpStatus;
  private final String message;

  SuccessStatus(HttpStatus httpStatus, String message) {
    this.httpStatus = httpStatus;
    this.message = message;
  }

  public int getStatusCode() {
    return this.httpStatus.value();
  }
}
