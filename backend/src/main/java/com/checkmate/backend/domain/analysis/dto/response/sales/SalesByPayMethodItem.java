package com.checkmate.backend.domain.analysis.dto.response.sales;

/** SLS_08 (결제수단별 매출) */
public record SalesByPayMethodItem(
        // 결제수단 (카드, 현금, 간편결제, 기타)
        String payMethod,

        // 결제수단의 실매출 금액
        long salesAmount,

        // 결제수단의 주문 건수
        long orderCount,

        /*
         * 현재 기간 내 해당 결제수단의 매출 비중 (%)
         * 계산식: (해당 결제수단 실매출 / 전체 살매출) * 100
         */
        double share,

        /*
         * 비교 기간 대비 매출 비중 변화량 (%p, 퍼센트포인트)
         * 계산식: 현재 share - 비교 기간 share
         * 예: 현재 30%, 비교 24% → +6%p
         */
        double deltaShare) {}
