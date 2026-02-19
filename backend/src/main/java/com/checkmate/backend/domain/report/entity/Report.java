package com.checkmate.backend.domain.report.entity;

import static jakarta.persistence.GenerationType.IDENTITY;

import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
        name = "report",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"store_id", "target_date"})})
public class Report extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "report_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "store_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Store store;

    @Column(name = "target_date", nullable = false)
    private LocalDate targetDate;

    /** 리포트 제목 전체 문자열 (예: "오늘은 매출이 좋은 날이에요.") */
    @Column(name = "title_full_text", nullable = false)
    private String titleFullText;

    /** 제목 내 하이라이트 키워드 (예: "매출이 좋은") */
    @Column(name = "title_highlight", nullable = false)
    private String titleHighlight;

    /** 운영 상태 라벨 (최상, 양호, 주의) */
    @Column(name = "status_label", nullable = false)
    private String statusLabel;

    /** 오늘 실매출 수치 */
    @Column(name = "net_sales", nullable = false)
    private Long netSales;

    /** 실매출 KPI 표시 정보 (label/value/diffVal/diffDesc/trendDir) */
    @Column(name = "net_sales_kpi", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private KpiItem netSalesKpi;

    /** 오늘 주문 건수 */
    @Column(name = "order_count", nullable = false)
    private Long orderCount;

    /** 주문건수 KPI 표시 정보 */
    @Column(name = "orders_kpi", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private KpiItem ordersKpi;

    /** 오늘 객단가 */
    @Column(name = "aov", nullable = false)
    private Long aov;

    /** 객단가(AOV) KPI 표시 정보 */
    @Column(name = "aov_kpi", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private KpiItem aovKpi;

    /** 분석 인사이트 리스트 (observe/meaning/impact 구조체) */
    @Column(name = "insights", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<InsightItem> insights;

    /** 내일의 운영 전략 리스트 */
    @Column(name = "strategies", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> strategies;

    /** KPI 항목 하나의 표시 정보 */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class KpiItem {
        /** 라벨 (예: "실매출") */
        private String label;

        /** 메인 수치 문자열 (예: "1,234,000원") */
        private String value;

        /** 변동 수치 문자열 (예: "+15.2%", "비슷", "비교불가") */
        private String diffVal;

        /** 비교 기준 설명 (예: "동요일 대비") */
        private String diffDesc;

        /** 프론트엔드 색상 키워드 (up|down|flat|none) */
        private String trendDir;
    }

    /** 인사이트 항목 구조 */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InsightItem {
        /** 순번 */
        private Integer idx;

        /** 관찰 (수치 기반 1문장) */
        private String observe;

        /** 해석 (의미 1문장) */
        private String meaning;

        /** 영향 (리스크·기회 1문장) */
        private String impact;
    }

    @Builder
    public Report(
            Store store,
            LocalDate targetDate,
            String titleFullText,
            String titleHighlight,
            String statusLabel,
            Long netSales,
            KpiItem netSalesKpi,
            Long orderCount,
            KpiItem ordersKpi,
            Long aov,
            KpiItem aovKpi,
            List<InsightItem> insights,
            List<String> strategies) {
        this.store = store;
        this.targetDate = targetDate;
        this.titleFullText = titleFullText;
        this.titleHighlight = titleHighlight;
        this.statusLabel = statusLabel;
        this.netSales = netSales;
        this.netSalesKpi = netSalesKpi;
        this.orderCount = orderCount;
        this.ordersKpi = ordersKpi;
        this.aov = aov;
        this.aovKpi = aovKpi;
        this.insights = insights;
        this.strategies = strategies;
    }
}
