package com.checkmate.backend.domain.analysis.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "대시보드 이름 요청")
public record DashboardNameRequest(
        @Schema(description = "대시보드 이름", example = "매출 분석") @NotBlank(message = "대시보드 이름은 필수입니다.")
                String name) {}
