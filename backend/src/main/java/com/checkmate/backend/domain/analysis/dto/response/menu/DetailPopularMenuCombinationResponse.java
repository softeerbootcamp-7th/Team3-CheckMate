package com.checkmate.backend.domain.analysis.dto.response.menu;

import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** MNU_05(인기 메뉴 조합) */
public record DetailPopularMenuCombinationResponse(List<PopularMenuCombinationItem> items)
        implements DetailAnalysisResponse {

    public record PopularMenuCombinationItem(
            String baseMenuName, // 기준 메뉴 (Top 메뉴)
            List<PairedMenuItem> pairedMenus // 함께 주문된 메뉴 리스트
            ) {

        public record PairedMenuItem(
                String menuName, // 함께 주문된 메뉴 이름
                Long count // 함께 주문된 횟수
                ) {}
    }
}
