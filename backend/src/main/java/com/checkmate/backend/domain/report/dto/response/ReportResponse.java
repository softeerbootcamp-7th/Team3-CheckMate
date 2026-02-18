package com.checkmate.backend.domain.report.dto.response;

import com.checkmate.backend.domain.report.entity.Report;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;

@Schema(description = "하루 리포트 상세 조회 응답 DTO")
public record ReportResponse(
        @Schema(description = "리포트 대상 날짜", example = "2026-02-14") LocalDate targetDate,
        @Schema(description = "리포트 제목", example = "2026년 2월 14일 일간 리포트") String title,
        @Schema(description = "운영 상태 라벨 (최상/양호/주의)", example = "최상") String statusLabel,
        @Schema(description = "주요 지표(KPI) 요약 정보") KpiSummary kpi,
        @Schema(
                        description = "분석 인사이트 리스트",
                        example = "[\"오후 2시-4시 사이 매출이 집중됨\", \"신메뉴 프로모션 반응이 좋음\"]")
                List<String> insights,
        @Schema(description = "내일의 운영 전략 리스트", example = "[\"재료 발주량 10% 상향 조정\", \"피크 타임 인력 재배치\"]")
                List<String> strategies) {
    @Schema(description = "주요 지표 요약 (텍스트 + 증감률)")
    public record KpiSummary(
            @Schema(description = "실매출 요약", example = "1,500,000원 (전일 대비 15% ▲)") String netSales,
            @Schema(description = "주문 건수 요약", example = "45건 (전일 대비 2건 ▼)") String orders,
            @Schema(description = "객단가(AOV) 요약", example = "33,333원 (전일 대비 5% ▲)") String aov) {}

    public static ReportResponse from(Report report) {
        return new ReportResponse(
                report.getTargetDate(),
                report.getTitle(),
                report.getStatusLabel(),
                new KpiSummary(
                        report.getNetSalesSummary(),
                        report.getOrdersSummary(),
                        report.getAovSummary()),
                report.getInsights(),
                report.getStrategies());
    }
}
