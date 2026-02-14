package com.checkmate.backend.domain.analysis.dto.response.menu;

import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import java.util.List;

/** MNU_03 (시간대별 메뉴 주문건수) */
public record DetailTimeSlotMenuOrderCountResponse(List<TimeSlotMenuGroupItem> items)
        implements DetailAnalysisResponse {

    /** 시간대별 메뉴 주문 그룹 */
    public record TimeSlotMenuGroupItem(
            Integer timeSlot2H, // 2시간 단위 타임슬롯
            Long totalOrderCount, // 해당 시간대 총 주문 건수
            List<TimeSlotMenuOrderCountItem> menus // 메뉴별 주문 건수
            ) {

        public record TimeSlotMenuOrderCountItem(
                String menuName, // 메뉴 이름
                Long orderCount // 주문 건수
                ) {}
    }
}
