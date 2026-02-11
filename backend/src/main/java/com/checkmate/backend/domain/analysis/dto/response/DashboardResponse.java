package com.checkmate.backend.domain.analysis.dto.response;

import com.checkmate.backend.domain.analysis.entity.Dashboard;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "대시보드 정보 응답")
public record DashboardResponse(
        @Schema(description = "대시보드 ID", example = "1") Long id,
        @Schema(description = "대시보드 이름", example = "홈 대시보드") String name,
        @Schema(description = "기본 대시보드 여부", example = "true") Boolean isDefault) {
    public static DashboardResponse from(Dashboard dashboard) {
        return new DashboardResponse(
                dashboard.getId(), dashboard.getName(), dashboard.getIsDefault());
    }
}
