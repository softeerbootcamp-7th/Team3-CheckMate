package com.checkmate.backend.global.validator;

import jakarta.validation.ConstraintValidatorContext;

public class ValidatorUtils {

    /** 검증 실패 시 사용자에게 보여줄 에러 메시지 추가 */
    public static void addErrorMessage(ConstraintValidatorContext context, String message) {
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
    }
}
