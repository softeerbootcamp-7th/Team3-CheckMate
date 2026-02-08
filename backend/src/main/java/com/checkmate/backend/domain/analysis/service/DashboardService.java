package com.checkmate.backend.domain.analysis.service;

import com.checkmate.backend.domain.analysis.dto.response.DashboardResponse;
import com.checkmate.backend.domain.analysis.entity.Dashboard;
import com.checkmate.backend.domain.analysis.repository.DashboardRepository;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.exception.ForbiddenException;
import com.checkmate.backend.global.exception.NotFoundException;
import com.checkmate.backend.global.response.ErrorStatus;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardRepository dashboardRepository;
    private final StoreRepository storeRepository;

    public List<DashboardResponse> getDashboards(Long storeId) {
        return dashboardRepository.findAllByStoreIdOrderByIdAsc(storeId).stream()
                .map(DashboardResponse::from)
                .toList();
    }

    @Transactional
    public Long addDashboard(Long storeId, String name) {
        // 최대 5개 제한 체크
        if (dashboardRepository.countByStoreId(storeId) >= 5) {
            throw new BadRequestException(ErrorStatus.DASHBOARD_LIMIT_EXCEEDED);
        }

        String trimmedName = validateAndTrimName(storeId, name, null);
        Store store = findStore(storeId);

        Dashboard dashboard = Dashboard.builder().name(trimmedName).store(store).build();

        return dashboardRepository.save(dashboard).getId();
    }

    @Transactional
    public void updateDashboardName(Long storeId, Long dashboardId, String newName) {
        // 1. 소유권 및 권한 검증
        Dashboard dashboard = validateDashboardAccess(storeId, dashboardId);

        // 2. 홈 대시보드 수정 불가 로직
        if (dashboard.getIsDefault()) {
            throw new BadRequestException(ErrorStatus.DEFAULT_DASHBOARD_MODIFICATION_RESTRICTED);
        }

        String trimmedName = validateAndTrimName(storeId, newName, dashboardId);
        dashboard.updateName(trimmedName);
    }

    @Transactional
    public void deleteDashboard(Long storeId, Long dashboardId) {
        // 1. 소유권 및 권한 검증
        Dashboard dashboard = validateDashboardAccess(storeId, dashboardId);

        // 2. 홈 대시보드 삭제 불가 로직
        if (dashboard.getIsDefault()) {
            throw new BadRequestException(ErrorStatus.DEFAULT_DASHBOARD_DELETE_RESTRICTED);
        }

        dashboardRepository.delete(dashboard);
    }

    private Dashboard validateDashboardAccess(Long storeId, Long dashboardId) {
        Dashboard dashboard = findDashboard(dashboardId);

        // 대시보드의 storeId와 현재 세션의 storeId가 일치하는지 확인
        if (!dashboard.getStore().getId().equals(storeId)) {
            log.warn(
                    "Unauthorized access attempt: storeId {} tried to access dashboardId {}",
                    storeId,
                    dashboardId);
            throw new ForbiddenException(ErrorStatus.DASHBOARD_ACCESS_DENIED);
        }

        return dashboard;
    }

    private String validateAndTrimName(Long storeId, String name, Long excludeDashboardId) {
        if (name == null || name.trim().isEmpty()) {
            throw new BadRequestException(ErrorStatus.INVALID_DASHBOARD_NAME);
        }

        String trimmedName = name.trim();

        if (trimmedName.length() > 6) {
            throw new BadRequestException(ErrorStatus.DASHBOARD_NAME_TOO_LONG);
        }

        boolean isDuplicate;
        if (excludeDashboardId == null) {
            isDuplicate = dashboardRepository.existsByStoreIdAndName(storeId, trimmedName);
        } else {
            isDuplicate =
                    dashboardRepository.existsByStoreIdAndNameAndIdNot(
                            storeId, trimmedName, excludeDashboardId);
        }

        if (isDuplicate) {
            throw new BadRequestException(ErrorStatus.DUPLICATE_DASHBOARD_NAME);
        }

        return trimmedName;
    }

    private Store findStore(Long storeId) {
        return storeRepository
                .findById(storeId)
                .orElseThrow(() -> new NotFoundException(ErrorStatus.STORE_NOT_FOUND_EXCEPTION));
    }

    private Dashboard findDashboard(Long dashboardId) {
        return dashboardRepository
                .findById(dashboardId)
                .orElseThrow(() -> new NotFoundException(ErrorStatus.DASHBOARD_NOT_FOUND));
    }
}
