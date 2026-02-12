package com.checkmate.backend.domain.report.dto;

import java.util.List;

public record ReportData(
        Meta meta,
        KpiToday kpiToday,
        BaselineTrend baselineTrend,
        BaselineLevel baselineLevel,
        DashboardMetrics dashboardMetrics) {
    public record Meta(String reportDate, String storeName, String weekStage) {}

    public record KpiToday(long netSales, long orders, Long aov) {}

    public record BaselineTrend(long netSales, long orders, long aov) {}

    public record BaselineLevel(long netSales, long orders) {}

    public record DashboardMetrics(List<MetricItem> metrics) {}

    public record MetricItem(
            String name, Object value, String unit, Long baselineTrendValue, String note) {}
}
