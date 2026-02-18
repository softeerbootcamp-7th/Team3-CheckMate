package com.checkmate.backend.domain.analysis.processor.sales;

import static com.checkmate.backend.domain.analysis.enums.AnalysisCode.*;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.sales.SalesTrendProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.SalesTrendBucket;
import com.checkmate.backend.domain.analysis.dto.response.sales.DashboardSalesTrendResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DetailSalesTrendResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.SalesTrendItem;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.enums.TimeUnit;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_09 (일별 매출 추이) SLS_10 (주별 매출 추이) SLS_11 (월별 매출 추이) SLS_12 (연별 매출 추이) */
@Component
@RequiredArgsConstructor
@Slf4j
public class SalesTrendProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return SLS_09 == analysisCardCode.getMetricCode()
                || SLS_10 == analysisCardCode.getMetricCode()
                || SLS_11 == analysisCardCode.getMetricCode()
                || AnalysisCode.SLS_12 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        TimeUnit unit = resolveUnit(context.getAnalysisCardCode());
        String truncUnit = unit.getTruncUnit();

        List<SalesTrendProjection> salesTrendProjections =
                salesAnalysisRepository.findSalesTrend(
                        context.getStoreId(),
                        truncUnit,
                        context.getStartDate(),
                        context.getEndDate());

        /*
         * 조회 결과를 날짜 기준 Map 으로 변환
         * bucket 누락 구간을 0으로 채우기 위해 사용
         * */
        Map<LocalDate, SalesTrendProjection> salesTrendByDate =
                salesTrendProjections.stream()
                        .collect(
                                Collectors.toMap(
                                        SalesTrendProjection::getBucketDate, Function.identity()));

        /*
         * 시작 ~ 종료 기간 사이 bucket 목록 생성
         * 그래프 X 축 전체 구간 생성
         * */
        List<LocalDate> buckets =
                generateBuckets(context.getStartDate(), context.getEndDate(), unit);

        List<SalesTrendBucket> salesTrendBuckets = new ArrayList<>();

        /*
         * anchor = 현재 지표 기준 날짜
         * endDate 는 exclusive 이므로 하루 감소
         * */
        LocalDateTime anchor = context.getAnchor();
        LocalDate anchorDate = anchor.toLocalDate();

        // 현재 bucket 계산
        LocalDate nowBucket = normalize(anchorDate, unit);

        /*
         * bucket 기준으로 데이터 생성
         * DB 결과가 없는 bucket은 0으로 보정
         * */
        for (LocalDate bucket : buckets) {

            SalesTrendProjection projection = salesTrendByDate.get(bucket);

            long netAmount =
                    Optional.ofNullable(projection)
                            .map(SalesTrendProjection::getNetAmount)
                            .orElse(0L);

            long orderCount =
                    Optional.ofNullable(projection)
                            .map(SalesTrendProjection::getOrderCount)
                            .orElse(0L);

            salesTrendBuckets.add(
                    new SalesTrendBucket(
                            bucket, buildLabel(anchorDate, bucket, unit), netAmount, orderCount));
        }

        /*
         * 상세분석 response
         * */
        List<SalesTrendItem> items = salesTrendBuckets.stream().map(SalesTrendItem::of).toList();

        DetailSalesTrendResponse detail = new DetailSalesTrendResponse(items);

        /*
         * 대시보드 response
         * items 재사용
         * */
        DashboardSalesTrendResponse dashboard = buildDashboard(nowBucket, salesTrendBuckets);

        return new AnalysisResponse(context.getAnalysisCardCode(), dashboard, detail);
    }

    /** 카드 코드 → bucket 단위 변환 */
    private TimeUnit resolveUnit(AnalysisCardCode analysisCardCode) {

        return switch (analysisCardCode.getMetricCode()) {
            case SLS_09 -> TimeUnit.DAY;
            case SLS_10 -> TimeUnit.WEEK;
            case SLS_11 -> TimeUnit.MONTH;
            case SLS_12 -> TimeUnit.YEAR;
            default -> {
                log.warn(
                        "[resolveUnit][Unknown metricCode: {}. Fallback to DAY.]",
                        analysisCardCode.getMetricCode());
                yield TimeUnit.DAY;
            }
        };
    }

    /** bucket 리스트 생성 */
    private List<LocalDate> generateBuckets(LocalDate start, LocalDate end, TimeUnit unit) {

        List<LocalDate> result = new ArrayList<>();

        LocalDate cursor = normalize(start, unit);

        while (cursor.isBefore(end)) {
            result.add(cursor);
            cursor = plus(cursor, unit);
        }

        return result;
    }

    /**
     * 날짜를 bucket 기준 시작점으로 보정
     *
     * <p>WEEK -> 해당 주 월요일 MONTH -> 1일 YEAR -> 1월 1일
     */
    private LocalDate normalize(LocalDate date, TimeUnit unit) {

        return switch (unit) {
            case DAY -> date;
            case WEEK -> date.with(DayOfWeek.MONDAY);
            case MONTH -> date.withDayOfMonth(1);
            case YEAR -> date.withDayOfYear(1);
        };
    }

    /** bucket 단위만큼 날짜 증가 */
    private LocalDate plus(LocalDate date, TimeUnit unit) {

        return switch (unit) {
            case DAY -> date.plusDays(1);
            case WEEK -> date.plusWeeks(1);
            case MONTH -> date.plusMonths(1);
            case YEAR -> date.plusYears(1);
        };
    }

    /** 그래프 라벨 생성 현재 bucket 은 "오늘 / 이번주 / 이번달 / 2025년" 처리 */
    private String buildLabel(LocalDate anchor, LocalDate bucket, TimeUnit unit) {

        LocalDate currentBucket = normalize(anchor, unit);

        // 현재 구간 라벨
        if (currentBucket.equals(bucket)) {
            return buildCurrentLabel(unit, anchor);
        }

        return switch (unit) {
            case DAY -> formatDay(bucket);
            case WEEK -> formatWeek(bucket);
            case MONTH -> formatMonth(bucket);
            case YEAR -> formatYear(bucket);
        };
    }

    /** 현재 bucket 라벨 생성 */
    private String buildCurrentLabel(TimeUnit unit, LocalDate anchor) {

        return switch (unit) {
            case DAY -> "오늘";
            case WEEK -> "이번주";
            case MONTH -> "이번달";
            case YEAR -> anchor.getYear() + "년";
        };
    }

    /** 일 단위 라벨 */
    private String formatDay(LocalDate d) {

        return "%d월 %d일".formatted(d.getMonthValue(), d.getDayOfMonth());
    }

    /**
     * 주 단위 라벨
     *
     * <p>같은 달 -> 3월 1~7일 다른 달 -> 3월 29일 ~ 4월 4일
     */
    private String formatWeek(LocalDate monday) {

        LocalDate sunday = monday.plusDays(6);

        // 같은 달
        if (monday.getMonth() == sunday.getMonth()) {
            return "%d월 %d~%d일"
                    .formatted(
                            monday.getMonthValue(), monday.getDayOfMonth(), sunday.getDayOfMonth());
        }

        // 다른 달
        return "%d월 %d일~%d월 %d일"
                .formatted(
                        monday.getMonthValue(),
                        monday.getDayOfMonth(),
                        sunday.getMonthValue(),
                        sunday.getDayOfMonth());
    }

    /** 월 단위 라벨 */
    private String formatMonth(LocalDate d) {
        return "%d년 %d월".formatted(d.getYear(), d.getMonthValue());
    }

    /** 연 단위 라벨 */
    private String formatYear(LocalDate d) {
        return "%d년".formatted(d.getYear());
    }

    /** 대시보드 데이터 생성 items 에서 현재 bucket 데이터 추출 */
    private DashboardSalesTrendResponse buildDashboard(
            LocalDate nowBucket, List<SalesTrendBucket> salesTrendBuckets) {

        return salesTrendBuckets.stream()
                .filter(bucket -> bucket.bucket().equals(nowBucket))
                .findFirst()
                .map(i -> new DashboardSalesTrendResponse(i.label(), i.orderCount(), i.netAmount()))
                .orElse(new DashboardSalesTrendResponse("0", 0, 0));
    }
}
