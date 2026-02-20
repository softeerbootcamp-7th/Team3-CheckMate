package com.checkmate.backend.domain.report.dto.response;

import com.checkmate.backend.domain.report.entity.Report;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;

@Schema(description = "하루 리포트 상세 조회 응답 DTO")
public record ReportResponse(
        @Schema(description = "리포트 대상 날짜", example = "2026-02-14") LocalDate targetDate,
        @Schema(description = "리포트 제목") Title title,
        @Schema(description = "운영 상태 라벨 (최상/양호/주의)", example = "최상") String statusLabel,
        @Schema(description = "주요 지표(KPI) 요약 정보") KpiSummary kpi,
        @Schema(description = "분석 인사이트 리스트") List<InsightItem> insights,
        @Schema(description = "내일의 운영 전략 리스트", example = "[\"재료 발주량 10% 상향 조정\", \"피크 타임 인력 재배치\"]")
                List<String> strategies) {

    @Schema(description = "리포트 제목 구조")
    public record Title(
            @Schema(description = "제목 전체 문자열", example = "오늘은 매출이 좋은 날이에요.") String fullText,
            @Schema(description = "하이라이트 키워드", example = "매출이 좋은") String highlight) {}

    @Schema(description = "KPI 항목 하나의 표시 정보")
    public record KpiItem(
            @Schema(description = "라벨", example = "실매출") String label,
            @Schema(description = "메인 수치 문자열", example = "1,234,000원") String value,
            @Schema(description = "변동 수치 문자열", example = "+15.2%") String diffVal,
            @Schema(description = "비교 기준 설명", example = "동요일 대비") String diffDesc,
            @Schema(description = "트렌드 방향 (up|down|flat|none)", example = "up") String trendDir) {}

    @Schema(description = "주요 지표 요약 (구조화된 KPI)")
    public record KpiSummary(
            @Schema(description = "실매출 KPI") KpiItem netSales,
            @Schema(description = "주문건수 KPI") KpiItem orders,
            @Schema(description = "객단가(AOV) KPI") KpiItem aov) {}

    @Schema(description = "인사이트 항목")
    public record InsightItem(
            @Schema(description = "순번", example = "1") Integer idx,
            @Schema(description = "관찰 (수치 기반 1문장)") String observe,
            @Schema(description = "해석 (의미 1문장)") String meaning,
            @Schema(description = "영향 (리스크·기회 1문장)") String impact) {}

    public static ReportResponse from(Report report) {
        return new ReportResponse(
                report.getTargetDate(),
                new Title(report.getTitleFullText(), report.getTitleHighlight()),
                report.getStatusLabel(),
                new KpiSummary(
                        toKpiItem(report.getNetSalesKpi()),
                        toKpiItem(report.getOrdersKpi()),
                        toKpiItem(report.getAovKpi())),
                toInsightItems(report.getInsights()),
                report.getStrategies());
    }

    private static KpiItem toKpiItem(Report.KpiItem e) {
        if (e == null) return null;
        return new KpiItem(
                e.getLabel(), e.getValue(), e.getDiffVal(), e.getDiffDesc(), e.getTrendDir());
    }

    private static List<InsightItem> toInsightItems(List<Report.InsightItem> entities) {
        if (entities == null) return List.of();
        return entities.stream()
                .map(
                        e ->
                                new InsightItem(
                                        e.getIdx(), e.getObserve(), e.getMeaning(), e.getImpact()))
                .toList();
    }
}
