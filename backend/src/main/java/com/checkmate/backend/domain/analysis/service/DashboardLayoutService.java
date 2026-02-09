package com.checkmate.backend.domain.analysis.service;

import com.checkmate.backend.domain.analysis.dto.request.LayoutUpdateRequest;
import com.checkmate.backend.domain.analysis.dto.response.CardLayoutResponse;
import com.checkmate.backend.domain.analysis.entity.Dashboard;
import com.checkmate.backend.domain.analysis.entity.DashboardCardLayout;
import com.checkmate.backend.domain.analysis.enums.CardSize;
import com.checkmate.backend.domain.analysis.repository.DashboardCardLayoutRepository;
import com.checkmate.backend.domain.analysis.util.DashboardValidator;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.response.ErrorStatus;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardLayoutService {

    private final DashboardValidator dashboardValidator;
    private final DashboardCardLayoutRepository layoutRepository;

    @Transactional
    public Long updateLayout(Long storeId, Long dashboardId, List<LayoutUpdateRequest> requests) {
        Dashboard dashboard = dashboardValidator.validateModificationAccess(storeId, dashboardId);
        validateLayoutRequests(requests);

        layoutRepository.deleteAllByDashboardId(dashboardId);

        List<DashboardCardLayout> newLayouts =
                requests.stream().map(req -> req.toEntity(dashboard)).toList();
        layoutRepository.saveAll(newLayouts);

        return dashboard.getId();
    }

    public List<CardLayoutResponse> getLayout(Long storeId, Long dashboardId) {
        dashboardValidator.validateAccess(storeId, dashboardId);

        return layoutRepository.findAllByDashboardId(dashboardId).stream()
                .map(CardLayoutResponse::from)
                .toList();
    }

    private void validateLayoutRequests(List<LayoutUpdateRequest> requests) {
        // 카드 종류 중복 검증
        long uniqueCards = requests.stream().map(LayoutUpdateRequest::cardCode).distinct().count();
        if (uniqueCards != requests.size()) {
            throw new BadRequestException(ErrorStatus.DUPLICATE_CARD_TYPE);
        }

        // 좌표 범위 및 겹침 검증
        Set<String> occupiedCells = new HashSet<>();

        for (LayoutUpdateRequest request : requests) {
            CardSize size = request.cardCode().getCardSize();
            int startRow = request.rowNo();
            int startCol = request.colNo();

            // 시작점 기본 범위 검증 (1보다 작은지)
            if (startRow < 1 || startCol < 1) {
                throw new BadRequestException(ErrorStatus.INVALID_DASHBOARD_CARD_POSITION);
            }

            // 카드의 높이(Height)와 너비(Width)만큼 루프를 돌며 차지하는 모든 셀 검사
            for (int h = 0; h < size.getHeight(); h++) {
                for (int w = 0; w < size.getWidth(); w++) {
                    int currentRow = startRow + h;
                    int currentCol = startCol + w;

                    // A. 대시보드 범위(3x3) 초과 검증
                    if (currentRow > 3 || currentCol > 3) {
                        throw new BadRequestException(ErrorStatus.INVALID_DASHBOARD_CARD_POSITION);
                    }

                    // B. 위치 중복(겹침) 검증
                    String cellKey = currentRow + "-" + currentCol;
                    if (occupiedCells.contains(cellKey)) {
                        throw new BadRequestException(ErrorStatus.DUPLICATE_CARD_POSITION);
                    }

                    occupiedCells.add(cellKey);
                }
            }
        }
    }
}
