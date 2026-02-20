package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.SalesTrendBucket;

/** SLS_09 (일별 매출 추이) SLS_10 (주별 매출 추이) SLS_11 (월별 매출 추이) SLS_12 (연별 매출 추이) */
public record SalesTrendItem(
        String label, // 막대 그래프 라벨
        long netAmount, // 실매출 합계
        long orderCount // 주문 건수
        ) {

    public static SalesTrendItem of(SalesTrendBucket bucket) {
        return new SalesTrendItem(bucket.label(), bucket.netAmount(), bucket.orderCount());
    }
}
