package com.checkmate.backend.domain.analysis.dto.request;

import com.checkmate.backend.domain.analysis.entity.Dashboard;
import com.checkmate.backend.domain.analysis.entity.DashboardCardLayout;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Schema(description = "대시보드 레이아웃 업데이트 요청")
public record LayoutUpdateRequest(
        @Schema(description = "카드 코드", example = "SLS_01_01") @NotNull(message = "카드 코드는 필수입니다.")
                AnalysisCardCode cardCode,
        @Schema(description = "행 번호 (1-3)", example = "1")
                @NotNull(message = "행 번호는 필수입니다.")
                @Min(value = 1, message = "행 번호는 1 이상이어야 합니다.")
                @Max(value = 3, message = "행 번호는 3 이하여야 합니다.")
                Integer rowNo,
        @Schema(description = "열 번호 (1-3)", example = "1")
                @NotNull(message = "열 번호는 필수입니다.")
                @Min(value = 1, message = "열 번호는 1 이상이어야 합니다.")
                @Max(value = 3, message = "열 번호는 3 이하여야 합니다.")
                Integer colNo) {
    public DashboardCardLayout toEntity(Dashboard dashboard) {
        return DashboardCardLayout.builder()
                .dashboard(dashboard)
                .cardCode(cardCode.name())
                .rowNo(rowNo)
                .colNo(colNo)
                .build();
    }
}
