package com.checkmate.backend.domain.report.dto;

import java.util.List;

public record ReportData(
        Meta meta,
        KpiToday kpiToday,
        BaselineTrend baselineTrend,
        BaselineLevel baselineLevel,
        Deltas deltas,
        DashboardMetrics dashboardMetrics) {

    public record Meta(String reportDate, String storeName, Integer dayIndex, String weekStage) {}

    public record KpiToday(long netSales, long orders, Long aov) {
        public KpiToday {
            if (aov == null) {
                aov = (orders > 0) ? (netSales / orders) : 0L;
            }
        }
    }

    public record BaselineTrend(long netSales, long orders, long aov) {}

    public record BaselineLevel(long netSales, long orders, long aov) {}

    public record Deltas(DeltaSet trendDeltaPct, DeltaSet levelDeltaPct) {
        public record DeltaSet(Double netSales, Double orders, Double aov) {}
    }

    public record DashboardMetrics(List<MetricItem> metrics) {}

    public record MetricItem(
            String name,
            Object value,
            String unit,
            Long baselineTrendValue,
            Double trendDeltaPct,
            Double levelDeltaPct,
            String note) {}

    public record StatsDto(long netSales, long orders, long aov) {
        public BaselineTrend toBaselineTrend() {
            return new BaselineTrend(netSales, orders, aov);
        }

        public BaselineLevel toBaselineLevel() {
            return new BaselineLevel(netSales, orders, aov);
        }
    }
}
