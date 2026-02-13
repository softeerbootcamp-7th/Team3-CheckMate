package com.checkmate.backend.domain.report.service;

import com.checkmate.backend.domain.order.repository.ReportAnalysisRepository;
import com.checkmate.backend.domain.report.dto.ReportData;
import com.checkmate.backend.domain.report.dto.ReportTask;
import com.checkmate.backend.domain.report.dto.projection.KpiTodayProjection;
import com.checkmate.backend.domain.report.dto.projection.StatsDtoProjection;
import com.checkmate.backend.domain.report.enums.WeekStage;
import com.checkmate.backend.domain.report.repository.MockInterfaceRepository;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * ReportQueryService
 *
 * <p>리포트 생성의 핵심 로직을 담당합니다. 스토어의 운영 기간(WeekStage)에 따라 동적으로 비교 기준(Trend, Level)을 산출하며, Repository의
 * Projection 결과를 DTO로 변환하여 조립합니다.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReportQueryService {

    private final ReportAnalysisRepository reportAnalysisRepository;
    private final MockInterfaceRepository mockRepository;
    private final StoreRepository storeRepository;

    /**
     * 메인 리포트 생성 메서드
     *
     * @param task 리포트 생성 요청 정보 (스토어 ID, 대상 날짜 등)
     * @return 최종 조립된 ReportData
     */
    public ReportData generateReport(ReportTask task) {
        Long storeId = task.storeId();
        LocalDateTime todayStart = task.startTime();
        LocalDateTime todayEnd = task.endTime();

        // 1. [Meta] 스토어 정보 조회 및 주차 단계(WeekStage) 계산
        Store store =
                storeRepository
                        .findById(storeId)
                        .orElseThrow(
                                () -> {
                                    log.error("Store not found: storeId={}", storeId);
                                    return new IllegalArgumentException("Store not found");
                                });

        // 운영 일수 계산 (개업일 ~ 리포트 타겟 날짜)
        long daysOpen =
                ChronoUnit.DAYS.between(store.getCreatedAt().toLocalDate(), task.targetDate()) + 1;
        WeekStage stage = WeekStage.fromDaysOpen(daysOpen);

        ReportData.Meta meta =
                new ReportData.Meta(
                        task.targetDate().toString(),
                        store.getStoreName(),
                        task.targetDate().getDayOfWeek().getValue() % 7,
                        stage.getCode());

        // 2. [KpiToday] 오늘의 실적 조회
        // Interface Projection으로 조회 후 Record로 변환
        KpiTodayProjection kpiProj =
                reportAnalysisRepository.findKpiToday(storeId, todayStart, todayEnd);
        ReportData.KpiToday kpiToday =
                new ReportData.KpiToday(
                        kpiProj.getNetSales(),
                        kpiProj.getOrders(),
                        null // DTO 생성자 내부에서 (netSales / orders)로 AOV 자동 계산
                        );

        // 3. [BaselineTrend] "비교" 기준값 계산 (어제 대비, 전주 대비 등)
        // WeekStage에 따라 계산 전략이 달라짐
        ReportData.BaselineTrend baselineTrend =
                calculateTrendBaseline(storeId, stage, todayStart, todayEnd);

        // 4. [BaselineLevel] "체급" 기준값 계산 (평소 내 실력)
        // 최근 N일간의 데이터를 바탕으로 중앙값 산출
        ReportData.BaselineLevel baselineLevel = calculateLevelBaseline(storeId, stage, todayStart);

        // 5. [Deltas] 변동률(%) 계산 (Today vs Trend / Today vs Level)
        ReportData.Deltas deltas = calculateDeltas(kpiToday, baselineTrend, baselineLevel);

        // 6. [Metrics & Context] 추가 데이터 조회 (Mock 데이터)
        List<ReportData.MetricItem> metrics =
                mockRepository.findDashboardMetrics(storeId, todayStart, todayEnd);

        // 7. 최종 조립 및 반환
        return new ReportData(
                meta,
                kpiToday,
                baselineTrend,
                baselineLevel,
                deltas,
                new ReportData.DashboardMetrics(metrics));
    }

    // --- 핵심 비즈니스 로직 메서드 ---

    /**
     * 3. Trend 기준값 계산 로직
     *
     * <p>- STAGE_0_2 (초기): 데이터 부족으로 '전일' 데이터와 비교 - STAGE_3_4 (과도기): '전일'과 '전주 동요일'의 평균값 사용 -
     * STAGE_5_PLUS (안정기): 최근 4주간 '같은 요일' 데이터의 중앙값 사용 (특이치 배제)
     */
    private ReportData.BaselineTrend calculateTrendBaseline(
            Long storeId, WeekStage stage, LocalDateTime start, LocalDateTime end) {

        switch (stage) {
            case STAGE_0_2:
                // 전일 데이터 조회 (Start/End - 24시간)
                StatsDtoProjection statsProj =
                        reportAnalysisRepository.findStats(
                                storeId, start.minusDays(1), end.minusDays(1));

                // Projection -> DTO 변환 후 BaselineTrend 반환
                return new ReportData.StatsDto(
                                statsProj.getNetSales(), statsProj.getOrders(), statsProj.getAov())
                        .toBaselineTrend();

            case STAGE_3_4:
                // 전일 + 전주 동요일 혼합 계산
                StatsDtoProjection yesterday =
                        reportAnalysisRepository.findStats(
                                storeId, start.minusDays(1), end.minusDays(1));
                StatsDtoProjection lastWeek =
                        reportAnalysisRepository.findStats(
                                storeId, start.minusWeeks(1), end.minusWeeks(1));

                long avgSales = (yesterday.getNetSales() + lastWeek.getNetSales()) / 2;
                long avgOrders = (yesterday.getOrders() + lastWeek.getOrders()) / 2;
                long avgAov = (avgOrders > 0) ? avgSales / avgOrders : 0; // AOV는 합산 후 재계산이 정확함

                return new ReportData.BaselineTrend(avgSales, avgOrders, avgAov);

            case STAGE_5_PLUS:
            default:
                // 최근 4주 동요일 데이터 리스트 조회 (Native Query -> Interface Projection)
                List<StatsDtoProjection> projections =
                        reportAnalysisRepository.findLast4WeeksSameDayStatsNative(
                                storeId, start, end);

                // Interface List -> DTO List 변환 (Stream)
                List<ReportData.StatsDto> history =
                        projections.stream()
                                .map(
                                        p ->
                                                new ReportData.StatsDto(
                                                        p.getNetSales(), p.getOrders(), p.getAov()))
                                .collect(Collectors.toList());

                // 중앙값 계산 후 반환
                return calculateMedianStats(history).toBaselineTrend();
        }
    }

    /**
     * 4. Level 기준값 계산 로직
     *
     * <p>매장의 '평소 체력'을 판단하기 위한 지표입니다. - 0~2주차: 데이터 부족으로 미산출 (0) - 3~4주차: 최근 7일 중앙값 - 5주차+: 최근 28일
     * 중앙값
     */
    private ReportData.BaselineLevel calculateLevelBaseline(
            Long storeId, WeekStage stage, LocalDateTime todayStart) {

        if (stage == WeekStage.STAGE_0_2) {
            return new ReportData.BaselineLevel(0, 0, 0);
        }

        int rangeDays = (stage == WeekStage.STAGE_3_4) ? 7 : 28;

        // 검색 범위: [오늘 시작 시점 - N일] ~ [오늘 시작 시점]
        LocalDateTime searchStart = todayStart.minusDays(rangeDays);

        // 일별 통계 조회 (Projection List)
        List<StatsDtoProjection> dailyProjections =
                reportAnalysisRepository.findDailyStats(storeId, searchStart, todayStart);

        // Interface List -> DTO List 변환
        List<ReportData.StatsDto> dailyStats =
                dailyProjections.stream()
                        .map(
                                p ->
                                        new ReportData.StatsDto(
                                                p.getNetSales(), p.getOrders(), p.getAov()))
                        .collect(Collectors.toList());

        return calculateMedianStats(dailyStats).toBaselineLevel();
    }

    /** 5. Deltas(변동률) 계산 공식: (Today - Base) / Base * 100 */
    private ReportData.Deltas calculateDeltas(
            ReportData.KpiToday today,
            ReportData.BaselineTrend trend,
            ReportData.BaselineLevel level) {

        // Trend 비교 (vs 어제/지난주/동요일 등)
        var trendDelta =
                new ReportData.Deltas.DeltaSet(
                        calculatePct(today.netSales(), trend.netSales()),
                        calculatePct(today.orders(), trend.orders()),
                        calculatePct(today.aov(), trend.aov()));

        // Level 비교 (vs 평소 체력)
        var levelDelta =
                new ReportData.Deltas.DeltaSet(
                        calculatePct(today.netSales(), level.netSales()),
                        calculatePct(today.orders(), level.orders()),
                        calculatePct(today.aov(), level.aov()));

        return new ReportData.Deltas(trendDelta, levelDelta);
    }

    // --- 수학/통계 보조 메서드 ---

    /** 퍼센트 계산 (소수점 1자리 반올림) 분모(base)가 0인 경우 0.0을 반환하여 ArithmeticException 방지 */
    private Double calculatePct(double current, double base) {
        if (base == 0) return 0.0;
        double val = ((current - base) / base) * 100.0;
        return Math.round(val * 10.0) / 10.0;
    }

    /** 리스트의 통계값에 대한 중앙값(Median) 계산 */
    private ReportData.StatsDto calculateMedianStats(List<ReportData.StatsDto> statsList) {
        if (statsList.isEmpty()) return new ReportData.StatsDto(0, 0, 0);

        long medianSales =
                getMedian(statsList.stream().map(ReportData.StatsDto::netSales).toList());
        long medianOrders = getMedian(statsList.stream().map(ReportData.StatsDto::orders).toList());
        long medianAov = (medianOrders > 0) ? medianSales / medianOrders : 0;

        return new ReportData.StatsDto(medianSales, medianOrders, medianAov);
    }

    /** 중앙값 추출 로직 - 데이터를 정렬 후 중간값을 선택 - 짝수 개수일 경우 중간 두 값의 평균 사용 */
    private long getMedian(List<Long> values) {
        if (values.isEmpty()) return 0;

        List<Long> sorted = new ArrayList<>(values);
        Collections.sort(sorted); // 정렬 필수

        int size = sorted.size();
        if (size % 2 == 1) {
            return sorted.get(size / 2);
        } else {
            return (sorted.get(size / 2 - 1) + sorted.get(size / 2)) / 2;
        }
    }
}
