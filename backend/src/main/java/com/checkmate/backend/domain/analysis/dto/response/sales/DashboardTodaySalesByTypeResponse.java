package com.checkmate.backend.domain.analysis.dto.response.sales;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.order.enums.SalesType;
import java.util.List;

/** 대시보드 SLS_06_1 (오늘 판매유형별 매출) */
public record DashboardTodaySalesByTypeResponse(
        SalesInsight insight, List<SalesByTypeItem> items // 판매 유형별 상세 리스트
        ) implements DashboardAnalysisResponse {

    public record SalesInsight(
            /*
             현재 기간 기준
             매출 비중이 가장 높은 판매 유형
            */
            SalesType topType,

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
}
