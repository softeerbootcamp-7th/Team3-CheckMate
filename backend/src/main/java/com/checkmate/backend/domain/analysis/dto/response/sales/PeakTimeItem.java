package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.projection.sales.TodayPeakTimeProjection;

/** SLS_13_01 (피크타임) */
public record PeakTimeItem(
        int timeSlot2H, // 2시간 슬롯
        long orderCount, // 주문 건수
        long netAmount // 실매출
        ) {

    public static PeakTimeItem of(TodayPeakTimeProjection projection) {
        return new PeakTimeItem(
                projection.timeSlot2H(), projection.orderCount(), projection.netAmount());
    }
}
