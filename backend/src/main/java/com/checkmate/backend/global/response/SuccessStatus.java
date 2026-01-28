package com.checkmate.backend.global.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum SuccessStatus {

  /** 200 */
  TEST_RESPONSE_SUCCESS(HttpStatus.OK, "테스트 응답 성공"),
  GOOGLE_LOGIN_SUCCESS(HttpStatus.OK, "구글 로그인에 성공했습니다."),
  BUSINESS_VERIFICATION_SUCCESS(HttpStatus.OK, "사업자 인증 성공했습니다."),

  /** 201 */
  SEND_PAY_INFO_SAVE_SUCCESS(HttpStatus.CREATED, "결제 정보 등록 성공"),
  STORE_CREATE_SUCCESS(HttpStatus.CREATED, "매장 등록 성공했습니다.");

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
