package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByDayProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DashboardSalesByDayResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DetailSalesByDayResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.SalesByDayItem;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import com.checkmate.backend.global.util.TimeUtil;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_14_06 (요일별 매출) */
@Component
@RequiredArgsConstructor
@Slf4j
public class SalesByDayProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCardCode.SLS_14_06 == analysisCardCode;
    }

    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        List<SalesByDayProjection> salesByDayProjections =
                salesAnalysisRepository.findSalesByDay(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        //  TopDay 계산
        SalesByDayProjection topDayProjection =
                salesByDayProjections.stream()
                        .max(Comparator.comparingDouble(SalesByDayProjection::avgNetAmount))
                        .orElse(null);

        String topDay = null;
        boolean isSignificant = false;

        if (topDayProjection != null) {

            topDay = getDayOfWeekShortKorean(topDayProjection.day());

            // 2위 요일 대비 10% 이상 차이 확인
            double topAmount = topDayProjection.avgNetAmount();

            double secondAmount =
                    salesByDayProjections.stream()
                            .filter(p -> !p.day().equals(topDayProjection.day()))
                            .mapToDouble(p -> p.avgNetAmount() != null ? p.avgNetAmount() : 0)
                            .max()
                            .orElse(0);

            isSignificant = topAmount >= secondAmount * 1.10;
        }

        LocalDateTime anchor = context.getAnchor();
        LocalDate anchorLocalDate = anchor.toLocalDate();

        int dayOfWeekValue = TimeUtil.getDayOfWeekValue(anchorLocalDate);

        // 오늘(anchor) 요일에 해당하는 Projection
        SalesByDayProjection todayProjection =
                salesByDayProjections.stream()
                        .filter(p -> p.day() != null && p.day().equals(dayOfWeekValue))
                        .findFirst()
                        .orElse(null); // 없으면 null 처리

        // 오늘 실매출과 주문건수, 없으면 0
        double todayAvgNetAmount =
                Optional.ofNullable(todayProjection)
                        .map(p -> p.avgNetAmount() != null ? p.avgNetAmount() : 0.0)
                        .orElse(0.0);

        long todayOrderCount =
                Optional.ofNullable(todayProjection)
                        .map(p -> p.orderCount() != null ? p.orderCount() : 0L)
                        .orElse(0L);

        DashboardSalesByDayResponse dashboard =
                new DashboardSalesByDayResponse(
                        getDayOfWeekShortKorean(dayOfWeekValue), // 오늘 요일
                        round(todayAvgNetAmount),
                        todayOrderCount,
                        topDay,
                        isSignificant);

        // keㅛ: 요일 value: salesByDayProjections
        Map<Integer, SalesByDayProjection> projectionMap =
                salesByDayProjections.stream()
                        .collect(
                                Collectors.toMap(
                                        SalesByDayProjection::day, // key: 요일
                                        Function.identity() // value: SalesByDayProjection 객체 자체
                                        ));

        List<SalesByDayItem> items = new ArrayList<>();

        for (int day = 1; day <= 7; day++) {
            SalesByDayProjection p = projectionMap.get(day);

            double avgNetAmount =
                    Optional.ofNullable(p).map(SalesByDayProjection::avgNetAmount).orElse(0.0);

            avgNetAmount = round(avgNetAmount);

            long orderCount =
                    Optional.ofNullable(p).map(SalesByDayProjection::orderCount).orElse(0L);

            items.add(new SalesByDayItem(getDayOfWeekShortKorean(day), avgNetAmount, orderCount));
        }

        DetailSalesByDayResponse detail = new DetailSalesByDayResponse(items);

        return new AnalysisResponse(context.getAnalysisCardCode(), dashboard, detail);
    }

    public static String getDayOfWeekShortKorean(int value) {
        return switch (value) {
            case 1 -> "월";
            case 2 -> "화";
            case 3 -> "수";
            case 4 -> "목";
            case 5 -> "금";
            case 6 -> "토";
            case 7 -> "일";
            default -> "월"; // fallback: 잘못된 값 들어오면 월로 처리
        };
    }

    /** 소수점 1자리까지 반올림 */
    private double round(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
