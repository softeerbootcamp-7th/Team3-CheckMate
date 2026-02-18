package com.checkmate.backend.domain.report.dto;

import com.checkmate.backend.domain.report.enums.ReportType;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReportTask(
        String taskId,
        Long storeId,
        ReportType reportType,
        LocalDate targetDate,
        LocalDateTime startTime,
        LocalDateTime endTime,
        int retryCount,
        LocalDateTime createdAt) {

    // 재시도를 위한 정적 팩토리 메서드 혹은 복사 메서드
    public ReportTask incrementRetry() {
        return new ReportTask(
                taskId,
                storeId,
                reportType,
                targetDate,
                startTime,
                endTime,
                retryCount + 1,
                LocalDateTime.now());
    }
}
