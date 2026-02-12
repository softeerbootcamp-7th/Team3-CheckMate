package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.order.enums.SalesType;

public record SalesByTypeItem(

        // 판매 유형 (홀 / 포장 / 배달 등)
        SalesType salesType,

        // 해당 판매 유형의 실매출 금액
        long salesAmount,

        // 해당 판매 유형의 주문 건수
        long orderCount,

        /*
         * 현재 기간 내 해당 판매 유형의 매출 비중 (%)
         * 계산식: (해당 유형 실매출 / 전체 살매출) * 100
         */
        double share,

        /*
         * 비교 기간 대비 매출 비중 변화량 (%p, 퍼센트포인트)
         * 계산식: 현재 share - 비교 기간 share
         * 예: 현재 30%, 비교 24% → +6%p
         */
        double deltaShare) {}
