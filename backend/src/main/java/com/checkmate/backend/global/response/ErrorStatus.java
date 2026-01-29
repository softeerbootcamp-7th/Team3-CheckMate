package com.checkmate.backend.global.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public enum ErrorStatus {

  /** 400 BAD_REQUEST */
  VALIDATION_REQUEST_MISSING_EXCEPTION(HttpStatus.BAD_REQUEST, "요청 값이 입력되지 않았습니다."),
  INVALID_OAUTH_STATE(HttpStatus.BAD_REQUEST, "유효하지 않은 OAuth state 파라미터입니다."),
  VALIDATION_EXCEPTION(HttpStatus.BAD_REQUEST, "요청 값이 올바르지 않습니다."),
  BUSINESS_NUMBER_INVALID_EXCEPTION(HttpStatus.BAD_REQUEST, "유효하지 않은 사업자번호입니다."),

  /** 404 */
  PAYMENT_INFO_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "해당 결제 정보를 찾을 수 없습니다."),
  MEMBER_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "해당 사용자를 찾을 수 없습니다."),

  /** 500 SERVER_ERROR */
  INTERNAL_SERVER_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류가 발생했습니다."),
  GOOGLE_TOKEN_EXCHANGE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "구글 토큰 교환에 실패했습니다."),
  ;

  private final HttpStatus httpStatus;
  private final String message;

  public int getStatusCode() {
    return this.httpStatus.value();
  }
}
