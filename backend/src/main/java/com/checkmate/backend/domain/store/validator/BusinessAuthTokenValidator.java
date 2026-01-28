package com.checkmate.backend.domain.store.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

@Component
public class BusinessAuthTokenValidator
    implements ConstraintValidator<ValidBusinessAuthToken, String> {

  /** TODO: 토큰 검증 로직 추가 */
  @Override
  public boolean isValid(String businessAuthToken, ConstraintValidatorContext context) {
    if (ViolationUtils.isBlank(businessAuthToken)) {
      ViolationUtils.addErrorMessage(context, "사업자 인증 토큰이 필요합니다.");
    }
    return true;
  }
}
