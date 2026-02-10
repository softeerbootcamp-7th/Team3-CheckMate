package com.checkmate.backend.domain.analysis.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dashboard_card_layout")
public class DashboardCardLayout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "dashboard_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Dashboard dashboard;

    @Column(name = "card_code", nullable = false)
    private String cardCode;

    @Column(name = "row_no", nullable = false)
    private Integer rowNo; // 1-3 범위

    @Column(name = "col_no", nullable = false)
    private Integer colNo; // 1-3 범위

    @Builder
    public DashboardCardLayout(Dashboard dashboard, String cardCode, Integer rowNo, Integer colNo) {
        this.dashboard = dashboard;
        this.cardCode = cardCode;
        this.rowNo = rowNo;
        this.colNo = colNo;
    }
}
