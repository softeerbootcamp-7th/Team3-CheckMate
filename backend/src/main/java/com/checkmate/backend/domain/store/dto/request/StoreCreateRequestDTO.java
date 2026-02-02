package com.checkmate.backend.domain.store.dto.request;

import com.checkmate.backend.domain.store.enums.DayOfWeekType;
import com.checkmate.backend.domain.store.validator.ValidWeeklyBusinessHours;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public record StoreCreateRequestDTO(
        @Schema(description = "사업자등록번호 검증 성공 시 발급되는 인증 토큰") @NotBlank String businessAuthToken,
        @Schema(description = "매장명")
                @NotBlank(message = "매장명을 입력해주세요.")
                @Size(max = 15, message = "매장명은 15자 이내로 입력하세요.")
                String storeName,
        @Schema(description = "우편번호") @NotBlank(message = "우편번호를 입력해주세요.") String zipcode,
        @Schema(description = "주소") @NotBlank(message = "주소를 입력해주세요.") String address1,
        @Schema(description = "상세주소") @NotBlank(message = "상세주소를 입력해주세요.") String address2,
        @Schema(description = "영업 시간 정보") @Valid @ValidWeeklyBusinessHours
                List<BusinessHour> businessHours,
        @Schema(description = "매출 마감 시간")
                @Min(value = 0, message = "매출 마감 시간은 0시부터 23시까지 선택할 수 있습니다.")
                @Max(value = 23, message = "매출 마감 시간은 0시부터 23시까지 선택할 수 있습니다.")
                Integer salesClosingHour) {

    public record BusinessHour(
            @Schema(description = "요일") @NotNull DayOfWeekType dayOfWeek,
            @Schema(description = "영업 시작 시간 (HH:mm, 30분 단위)")
                    @Pattern(
                            regexp = "^([01]\\d|2[0-3]):(00|30)$|^24:00$",
                            message = "영업 시작 시간은 30분 단위의 HH:mm 형식이어야 합니다.")
                    String openTime,
            @Schema(description = "영업 마감 시간 (HH:mm)")
                    @Pattern(
                            regexp = "^([01]\\d|2[0-3]):(00|30)$|^24:00$",
                            message = "영업 마감 시간은 30분 단위의 HH:mm 형식이어야 합니다.")
                    String closeTime,
            @Schema(description = "휴무 여부") boolean closed) {}
}
