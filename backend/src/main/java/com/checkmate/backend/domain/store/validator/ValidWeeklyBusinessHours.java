package com.checkmate.backend.domain.store.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = WeeklyBusinessHoursValidator.class)
public @interface ValidWeeklyBusinessHours {
  String message() default "영업시간 정보가 올바르지 않습니다.";

  Class<?>[] groups() default {}; // 검증을 언제 실행할지 (생성할 때만, 수정할 때만 등)

  Class<? extends Payload>[] payload() default {}; // 검증 메타데이터(에러 심각도, 로깅 레벨 등)
}
