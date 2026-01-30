package com.checkmate.backend.domain.store.validator;

import com.checkmate.backend.global.validator.ValidatorUtils;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class BusinessAuthTokenValidator
        implements ConstraintValidator<ValidBusinessAuthToken, String> {

    /** TODO: 토큰 검증 로직 추가 */
    @Override
    public boolean isValid(String businessAuthToken, ConstraintValidatorContext context) {
        if (!StringUtils.hasText(businessAuthToken)) {
            ValidatorUtils.addErrorMessage(context, "사업자 인증 토큰이 필요합니다.");
            return false;
        }

        return true;
    }
}
