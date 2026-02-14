package com.checkmate.backend.domain.analysis.dto.response.menu;

import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;

/** MNU_05(인기 메뉴 조합) */
public record DashboardPopularMenuCombinationResponse(String firstMenuName, String secondMenuName)
        implements DashboardAnalysisResponse {}
