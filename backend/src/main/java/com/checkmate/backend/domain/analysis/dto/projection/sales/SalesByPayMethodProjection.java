package com.checkmate.backend.domain.analysis.dto.projection.sales;

/** SLS_08 (결제수단별 매출) */
public record SalesByPayMethodProjection(
        String payMethod, // 카드, 현금, 간편결제, 기타
        Long netAmount, // 해당 결제수단의 실매출 합계
        Long orderCount // 해당 결제수단의 주문 건수
        ) {}
