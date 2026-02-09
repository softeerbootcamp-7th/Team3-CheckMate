package com.checkmate.backend.domain.analysis.util;

import com.checkmate.backend.domain.analysis.entity.Dashboard;
import com.checkmate.backend.domain.analysis.repository.DashboardRepository;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.exception.ForbiddenException;
import com.checkmate.backend.global.exception.NotFoundException;
import com.checkmate.backend.global.response.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DashboardValidator {

    private final DashboardRepository dashboardRepository;

    /** 단순 접근 권한 검증 (조회용) - 내 매장의 대시보드거나, 시스템 기본 대시보드(storeId == null)면 통과 */
    public Dashboard validateAccess(Long storeId, Long dashboardId) {
        Dashboard dashboard = findDashboard(dashboardId);

        if (dashboard.getStore() == null) {
            return dashboard;
        }

        if (!storeId.equals(dashboard.getStore().getId())) {
            throw new ForbiddenException(ErrorStatus.DASHBOARD_ACCESS_DENIED);
        }

        return dashboard;
    }

    /** 수정/삭제 권한 검증 (수정용) - 반드시 내 매장의 대시보드여야 함 (시스템 기본 대시보드는 수정 불가) */
    public Dashboard validateModificationAccess(Long storeId, Long dashboardId) {
        Dashboard dashboard = findDashboard(dashboardId);

        if (dashboard.getStore() == null) {
            throw new BadRequestException(ErrorStatus.DEFAULT_DASHBOARD_MODIFICATION_RESTRICTED);
        }

        if (!dashboard.getStore().getId().equals(storeId)) {
            throw new ForbiddenException(ErrorStatus.DASHBOARD_ACCESS_DENIED);
        }

        return dashboard;
    }

    private Dashboard findDashboard(Long dashboardId) {
        return dashboardRepository
                .findById(dashboardId)
                .orElseThrow(() -> new NotFoundException(ErrorStatus.DASHBOARD_NOT_FOUND));
    }
}
