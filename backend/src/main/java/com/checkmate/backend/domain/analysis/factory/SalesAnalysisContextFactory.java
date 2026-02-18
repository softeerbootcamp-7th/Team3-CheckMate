package com.checkmate.backend.domain.analysis.factory;

import com.checkmate.backend.domain.analysis.context.AnalysisContext;
import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.DomainCategory;
import com.checkmate.backend.domain.order.OrderCreatedEvent;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.stereotype.Component;

@Component
public class SalesAnalysisContextFactory implements AnalysisContextFactory {
    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return DomainCategory.SALES == analysisCardCode.getMetricCode().getDomain();
    }

    @Override
    public AnalysisContext create(AnalysisCardCode analysisCardCode, OrderCreatedEvent event) {
        LocalDateTime anchor = event.anchor();
        LocalDate today = anchor.toLocalDate();

        return switch (analysisCardCode) {

                /*
                 * SLS_01_01 (오늘 실매출)
                 * SLS_02_01 (오늘 주문건수)
                 * SLS_03_01 (오늘 건당 평균가)
                 * SLS_06_01 (오늘 판매유형별 매출)
                 * SLS_07_01 (오늘 주문수단별 매출)
                 * SLS_08_01 (오늘 결제수단별 매출)
                 * */

            case SLS_01_01, SLS_02_01, SLS_03_01, SLS_06_01, SLS_07_01, SLS_08_01 -> {
                LocalDate start = today;
                LocalDate end = today.plusDays(1);

                // 비교 기간: 지난주 동일 요일
                LocalDate comparisonStart = start.minusWeeks(1);
                LocalDate comparisonEnd = end.minusWeeks(1);

                yield new SalesAnalysisContext(
                        event.storeId(),
                        analysisCardCode,
                        start,
                        end,
                        anchor,
                        comparisonStart,
                        comparisonEnd);
            }

                /*
                 * SLS_01_02 (이번주 실매출)
                 * SLS_02_02 (이번주 주문건수)
                 * SLS_03_02 (이번주 건당 평균가)
                 * */

            case SLS_01_02, SLS_02_02, SLS_03_02 -> {
                LocalDate start = today.with(DayOfWeek.MONDAY);
                LocalDate end = today.plusDays(1);

                // 비교 기간: 지난주
                LocalDate comparisonStart = start.minusWeeks(1);
                LocalDate comparisonEnd = end.minusWeeks(1);

                yield new SalesAnalysisContext(
                        event.storeId(),
                        analysisCardCode,
                        start,
                        end,
                        anchor,
                        comparisonStart,
                        comparisonEnd);
            }

                /*
                 * SLS_01_03 (이번달 실매출)
                 * SLS_02_03 (이번달 주문건수)
                 * SLS_03_03 (이번달 건당 평균가)
                 * */

            case SLS_01_03, SLS_02_03, SLS_03_03 -> {
                LocalDate start = today.withDayOfMonth(1);
                LocalDate end = today.plusDays(1);

                // 비교 기간: 지난달 같은 일자 범위
                LocalDate comparisonStart = start.minusMonths(1);
                LocalDate comparisonEnd = today.minusMonths(1).plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(),
                        analysisCardCode,
                        start,
                        end,
                        anchor,
                        comparisonStart,
                        comparisonEnd);
            }

                /*
                 * SLS_13_01 (피크타임)
                 * */

            case SLS_13_01 -> {
                LocalDate start = today;
                LocalDate end = today.plusDays(1);

                // 비교 기간: 최근 4주
                LocalDate comparisonStart = today.minusWeeks(4);
                LocalDate comparisonEnd = today;

                yield new SalesAnalysisContext(
                        event.storeId(),
                        analysisCardCode,
                        start,
                        end,
                        anchor,
                        comparisonStart,
                        comparisonEnd);
            }

                /*
                 * SLS_04_02 (이번주 총매출)
                 * SLS_05_02 (이번주 할인 & 취소)
                 * SLS_06_02 (이번주 판매유형별 매출)
                 * SLS_07_02 (이번주 주문수단별 매출)
                 * SLS_08_02 (이번주 결제수단별 매출)
                 * */

            case SLS_04_02, SLS_05_02, SLS_06_02, SLS_07_02, SLS_08_02 -> {
                LocalDate start = today.with(DayOfWeek.MONDAY);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_06_03 (이번달 판매유형별 매출)
                 * SLS_07_03 (이번달 주문수단별 매출)
                 * SLS_08_03 (이번달 결제수단별 매출)
                 * */

            case SLS_06_03, SLS_07_03, SLS_08_03 -> {
                LocalDate start = today.withDayOfMonth(1);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_09_04_04 (일별 매출 추이 (최근 7일))
                 * */

            case SLS_09_04 -> {
                LocalDate start = today.minusDays(7);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_09_05 (일별 매출 추이 (최근 14일))
                 * */

            case SLS_09_05 -> {
                LocalDate start = today.minusDays(14);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_09_06 (일별 매출 추이 (최근 30일))
                 * */

            case SLS_09_06 -> {
                LocalDate start = today.minusDays(30);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }
                /*
                 * SLS_10_07 (주별 매출 추이 (최근 8주))
                 * */

            case SLS_10_07 -> {
                LocalDate start = today.minusWeeks(8);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_10_08 (주별 매출 추이 (최근 12주))
                 * */

            case SLS_10_08 -> {
                LocalDate start = today.minusWeeks(12);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_11_07 (월별 매출 추이 (최근 6개월))
                 * */

            case SLS_11_07 -> {
                LocalDate start = today.minusMonths(6);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_11_08 (월별 매출 추이 (최근 12개월))
                 * */

            case SLS_11_08 -> {
                LocalDate start = today.minusMonths(12);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_12_01 (연별 매출 추이)
                 * */

            case SLS_12_01 -> {
                LocalDate start = today.minusYears(3);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_04_01 (오늘 총매출)
                 * SLS_05_01 (오늘 할인 & 취소)
                 * */

            case SLS_04_01, SLS_05_01 -> {
                LocalDate start = today;
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_04_03 (이번달 총매출)
                 * SLS_05_03 (이번달 할인 & 취소)
                 * */

            case SLS_04_03, SLS_05_03 -> {
                LocalDate start = today.withDayOfMonth(1);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

                /*
                 * SLS_14_06 (요일별 매출)
                 * */

            case SLS_14_06 -> {
                LocalDate start = today.minusWeeks(4);
                LocalDate end = today.plusDays(1);

                yield new SalesAnalysisContext(
                        event.storeId(), analysisCardCode, start, end, anchor, null, null);
            }

            default -> null;
        };
    }

    @Override
    public AnalysisContext create(
            AnalysisCardCode analysisCardCode, Long storeId, LocalDate start, LocalDate end) {
        return new SalesAnalysisContext(
                storeId, analysisCardCode, start, end, LocalDateTime.now(), null, null);
    }
}
