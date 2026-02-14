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

    // 리포트 대상 날짜
    @Column(name = "target_date", nullable = false)
    private LocalDate targetDate;

    @Column(name = "title", nullable = false)
    private String title;

    /** 운영 상태 라벨 (최상, 양호, 주의) */
    @Column(name = "status_label", nullable = false)
    private String statusLabel;

    /** 실매출 요약 정보 (텍스트 + 증감률) */
    @Column(name = "net_sales_summary")
    private String netSalesSummary;

    /** 주문 건수 요약 정보 */
    @Column(name = "orders_summary")
    private String ordersSummary;

    /** 객단가(AOV) 요약 정보 */
    @Column(name = "aov_summary")
    private String aovSummary;

    /** 분석 인사이트 리스트 PostgreSQL의 JSONB 타입을 사용하여 가변적인 리스트 데이터를 효율적으로 저장 */
    @Column(columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> insights;

    /** 내일의 운영 전략 리스트 순서가 중요한 데이터이므로 JSON 배열 형태로 저장하여 가독성 유지 */
    @Column(columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> strategies;

    @Builder
    public Report(
            Store store,
            LocalDate targetDate,
            String title,
            String statusLabel,
            String netSalesSummary,
            String ordersSummary,
            String aovSummary,
            List<String> insights,
            List<String> strategies) {
        this.store = store;
        this.targetDate = targetDate;
        this.title = title;
        this.statusLabel = statusLabel;
        this.netSalesSummary = netSalesSummary;
        this.ordersSummary = ordersSummary;
        this.aovSummary = aovSummary;
        this.insights = insights;
        this.strategies = strategies;
    }
}
