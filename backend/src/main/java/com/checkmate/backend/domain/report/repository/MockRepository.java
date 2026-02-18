package com.checkmate.backend.domain.report.repository;

import com.checkmate.backend.domain.report.dto.ReportData;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class MockRepository {

    public List<ReportData.MetricItem> findDashboardMetrics(
            Long storeId, LocalDateTime start, LocalDateTime end) {
        return List.of();
    }
}
