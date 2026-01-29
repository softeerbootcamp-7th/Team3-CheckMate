package com.checkmate.backend.domain.store.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = BusinessAuthTokenValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidBusinessAuthToken {

  String message() default "유효하지 않은 사업자 인증 토큰입니다.";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
