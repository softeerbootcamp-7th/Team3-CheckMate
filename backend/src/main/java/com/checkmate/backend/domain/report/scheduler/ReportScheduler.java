package com.checkmate.backend.domain.report.scheduler;

import com.checkmate.backend.domain.report.dto.ReportTask;
import com.checkmate.backend.domain.report.enums.ReportType;
import com.checkmate.backend.domain.report.repository.ReportTaskRepository;
import com.checkmate.backend.domain.store.entity.BusinessHour;
import com.checkmate.backend.domain.store.enums.DayOfWeekType;
import com.checkmate.backend.domain.store.repository.BusinessHourRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReportScheduler {

    private final BusinessHourRepository businessHourRepository;
    private final ReportTaskRepository reportTaskRepository;

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    @Scheduled(cron = "0 0,30 * * * *")
    public void produceReportTasks() {
        LocalDateTime now = LocalDateTime.now();
        String timeStr = now.format(TIME_FORMATTER);
        Integer hourInt = now.getHour();

        // 요일 계산 (한글 요일명 변환 가정)
        String today = DayOfWeekType.toKorean(now.getDayOfWeek());
        String yesterday = DayOfWeekType.toKorean(now.minusDays(1).getDayOfWeek());

        log.info("리포트 스케줄러 가동 시각: {}, 탐색 요일: {}", timeStr, today);

        // 1. 일반 매장 탐색 (현재 시각에 마감하는 매장)
        List<BusinessHour> normalStores =
                businessHourRepository.findNormalClosingStores(today, yesterday, timeStr);
        processNormalStores(normalStores, now);

        // 2. 24시간 매장 탐색 (정각에만 수행, 현재 시각이 정산 기준 시간인 매장)
        if (now.getMinute() == 0) {
            List<BusinessHour> stores24H =
                    businessHourRepository.find24HClosingStores(today, hourInt);
            process24HStores(stores24H, now);
        }
    }

    /** 일반 매장(Normal) Task 생성 및 적재 */
    private void processNormalStores(List<BusinessHour> stores, LocalDateTime now) {
        for (BusinessHour bh : stores) {
            try {
                // 영업 종료 시간은 현재 스케줄러 실행 시간(now)과 같음
                LocalTime closeTime = LocalTime.parse(bh.getCloseTime(), TIME_FORMATTER);
                LocalTime openTime = LocalTime.parse(bh.getOpenTime(), TIME_FORMATTER);

                LocalDate reportDate;
                LocalDateTime startTime;
                LocalDateTime endTime;

                if (bh.isClosesNextDay()) {
                    // 새벽 마감 (예: 어제 18:00 오픈 ~ 오늘 02:00 마감)
                    reportDate = now.toLocalDate().minusDays(1); // 영업일은 '어제'
                } else {
                    // 당일 마감 (예: 오늘 10:00 오픈 ~ 오늘 22:00 마감)
                    reportDate = now.toLocalDate(); // 영업일은 '오늘'
                }
                startTime = LocalDateTime.of(reportDate, openTime); // 어제 오픈 시간
                endTime = now; // 오늘 마감 시간 (현재)

                enqueueTask(bh.getStore().getId(), reportDate, startTime, endTime);

            } catch (Exception e) {
                log.error("일반 매장 리포트 적재 실패 - StoreID: {}", bh.getStore().getId(), e);
            }
        }
    }

    /** 24시간 매장(24H) Task 생성 및 적재 */
    private void process24HStores(List<BusinessHour> stores, LocalDateTime now) {
        for (BusinessHour bh : stores) {
            try {
                // TODO : 추후 변경 가능성 고려
                // 24시간 매장은 '어제 정산시간 ~ 오늘 정산시간(현재)'를 분석 범위로 잡음
                LocalDate reportDate = now.toLocalDate().minusDays(1);
                LocalDateTime endTime = now; // 현재 시각 (정산 기준 시간)
                LocalDateTime startTime = now.minusDays(1); // 정확히 24시간 전

                enqueueTask(bh.getStore().getId(), reportDate, startTime, endTime);

            } catch (Exception e) {
                log.error("24시간 매장 리포트 적재 실패 - StoreID: {}", bh.getStore().getId(), e);
            }
        }
    }

    // TODO : 큐 적재 로직 개선 (배치 처리 등), 실패 시 재시도 로직 추가
    private void enqueueTask(
            Long storeId, LocalDate targetDate, LocalDateTime startTime, LocalDateTime endTime) {
        ReportTask task =
                new ReportTask(
                        UUID.randomUUID().toString(),
                        storeId,
                        ReportType.DAILY,
                        targetDate,
                        startTime,
                        endTime,
                        0,
                        LocalDateTime.now());

        reportTaskRepository.push(task);

        log.info(
                "큐 적재 완료 [TaskID: {}] 매장: {}, 타겟: {}, 범위: {} ~ {}",
                task.taskId(),
                storeId,
                targetDate,
                startTime,
                endTime);
    }
}
