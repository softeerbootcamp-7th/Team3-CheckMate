package com.checkmate.backend.domain.analysis.dto.projection.sales;

/** SLS_07 (주문수단별 매출) */
public record SalesByOrderChannelProjection(
        String orderChannel, // POS, 키오스크, 배달앱
        Long netAmount, // 해당 주문수단별의 실매출 합계
        Long orderCount // 해당 주문수단별의 주문 건수
        ) {}
