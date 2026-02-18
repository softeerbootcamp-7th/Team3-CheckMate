package com.checkmate.backend.domain.analysis.dto.projection.menu;

/** MNU_05(인기 메뉴 조합) */
public record OrderMenusProjection(
        Long orderId, // 주문 id
        String menuIds // json_agg 결과를 문자열로 받음
        ) {}
