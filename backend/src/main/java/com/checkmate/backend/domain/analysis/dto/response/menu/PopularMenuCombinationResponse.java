package com.checkmate.backend.domain.analysis.dto.response.menu;

import java.util.List;

/** MNU_05(인기 메뉴 조합) */
public record PopularMenuCombinationResponse(
        String baseMenuName, // 기준(top3) 메뉴 이름
        List<PairedMenu> pairedMenus // 함께 주문된 메뉴 리스트 + 카운트
        ) {

    public record PairedMenu(
            String menuName, // 함께 주문된 메뉴 이름
            Long count // 함께 주문된 횟수
            ) {}
}
