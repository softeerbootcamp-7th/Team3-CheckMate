package com.checkmate.backend.domain.analysis.dto.response;

import com.checkmate.backend.domain.analysis.entity.DashboardCardLayout;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "대시보드 지표 카드 레이아웃 응답 DTO")
public record CardLayoutResponse(
        @Schema(description = "지표 카드 코드", example = "SLS_01_01") String cardCode,
        @Schema(description = "행 위치 (1-3)", example = "1") Integer rowNo,
        @Schema(description = "열 위치 (1-3)", example = "1") Integer colNo) {
    public static CardLayoutResponse from(DashboardCardLayout layout) {
        return new CardLayoutResponse(
                layout.getCardCode(),
                layout.getRowNo(), // 1-3 범위
                layout.getColNo() // 1-3 범위
                );
    }
}
