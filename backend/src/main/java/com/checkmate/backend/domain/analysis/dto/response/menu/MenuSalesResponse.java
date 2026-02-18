package com.checkmate.backend.domain.analysis.dto.response.menu;

import com.checkmate.backend.domain.analysis.dto.projection.menu.MenuSalesProjection;
import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** MNU_01(메뉴별 매출 랭킹) */
public record MenuSalesResponse(List<MenuSalesItem> items)
        implements DashboardAnalysisResponse, DetailAnalysisResponse {
    public record MenuSalesItem(
            String menuName, // 메뉴 이름
            Long totalSalesAmount, // 총 매출액
            Long orderCount // 판매 건수
            ) {

        public static MenuSalesItem of(MenuSalesProjection projection) {
            return new MenuSalesItem(
                    projection.menuName(), projection.totalSalesAmount(), projection.orderCount());
        }
    }
}
