package com.checkmate.backend.domain.analysis.dto;

import com.checkmate.backend.domain.analysis.entity.Dashboard;

public record DashboardResponse(Long id, String name, Boolean isDefault) {
    public static DashboardResponse from(Dashboard dashboard) {
        return new DashboardResponse(
                dashboard.getId(), dashboard.getName(), dashboard.getIsDefault());
    }
}
