package com.checkmate.backend.domain.analysis.dto.response.sales;

public record SalesInsight(
        /*
         현재 기간 기준
         매출 비중이 가장 높은 유형
        */
        String topType,

        /*
         topType의 현재 매출 비중 (%)
        */
        double topShare,

        /*
         topType의 비교 기간 대비 비중 변화량 (%p)
        */
        double deltaShare,

        /*
         변화 문구 표시 여부 (deltaShare ≥ 3%p)
        */
        boolean showDeltaText,

        /*
         집중 문구 표시 여부 (topShare ≥ 60%)
        */
        boolean showFocusText) {}
