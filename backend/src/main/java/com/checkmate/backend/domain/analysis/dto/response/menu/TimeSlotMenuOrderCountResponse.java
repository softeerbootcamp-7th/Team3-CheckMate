package com.checkmate.backend.domain.analysis.dto.response.menu;

import java.util.List;

/** MNU_03 (시간대별 메뉴 주문건수) */
public record TimeSlotMenuOrderCountResponse(
        Integer timeSlot2H, // 2시간 타임 슬롯
        Long totalOrderCount, // 슬롯 전체 주문수
        List<MenuOrderCount> menus // 메뉴들
        ) {
    public record MenuOrderCount(
            String menuName, // 메뉴 이름
            Long orderCount // 주문건수
            ) {}
}
