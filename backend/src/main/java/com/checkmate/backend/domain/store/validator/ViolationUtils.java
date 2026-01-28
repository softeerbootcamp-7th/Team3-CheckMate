package com.checkmate.backend.domain.store.validator;

import jakarta.validation.ConstraintValidatorContext;

public class ViolationUtils {

  public static boolean isBlank(String s) {
    return s == null || s.trim().isEmpty();
  }

  /** 검증 실패 시 사용자에게 보여줄 에러 메시지 추가 */
  public static void addErrorMessage(ConstraintValidatorContext context, String message) {
    context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
  }
}
