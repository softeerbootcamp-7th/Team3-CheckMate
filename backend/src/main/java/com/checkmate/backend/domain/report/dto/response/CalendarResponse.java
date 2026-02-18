package com.checkmate.backend.domain.report.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;

@Schema(description = "캘린더 월간 실매출 목록 조회 응답 DTO")
public record CalendarResponse(@Schema(description = "월간 일별 매출 리스트") List<DaySales> monthlySales) {
    @Schema(description = "일별 실매출 정보")
    public record DaySales(
            @Schema(description = "날짜", example = "2026-02-14") LocalDate date,
            @Schema(description = "당일 실매출액", example = "1500000") Long netSales) {}
}
