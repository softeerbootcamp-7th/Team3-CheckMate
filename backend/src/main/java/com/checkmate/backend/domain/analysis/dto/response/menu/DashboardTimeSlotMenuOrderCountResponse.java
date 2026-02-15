package com.checkmate.backend.domain.analysis.dto.response.menu;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;

/** MNU_03 (시간대별 메뉴 주문건수) */
public record DashboardTimeSlotMenuOrderCountResponse(
        Integer timeSlot2H, // 2시간 단위 타임슬롯
        String menuName // 메뉴 이름
        ) implements DashboardAnalysisResponse {}
