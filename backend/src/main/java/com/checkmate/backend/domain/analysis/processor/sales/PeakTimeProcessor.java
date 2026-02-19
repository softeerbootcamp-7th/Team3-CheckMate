package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.sales.PeakTimeAvgProjection;
import com.checkmate.backend.domain.analysis.dto.projection.sales.TodayPeakTimeProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DashboardPeakTimeResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DetailPeakTimeResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.PeakTimeItem;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.ShiftDirection;
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

/** SLS_13_01 (피크타임) */
@Component
@RequiredArgsConstructor
@Slf4j
public class PeakTimeProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCardCode.SLS_13_01 == analysisCardCode;
    }

    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        LocalDateTime anchor = context.getAnchor();
        LocalDate anchorLocalDate = anchor.toLocalDate();

        int dayOfWeekValue = TimeUtil.getDayOfWeekValue(anchorLocalDate);

        List<TodayPeakTimeProjection> todayPeakTimeProjections =
                salesAnalysisRepository.findTodayPeakTime(context.getStoreId(), anchorLocalDate);

        List<PeakTimeAvgProjection> peakTimeAvgProjections =
                salesAnalysisRepository.findPeakTimeAvg(
                        context.getStoreId(),
                        context.getComparisonStart(),
                        context.getComparisonEnd(),
                        dayOfWeekValue);

        // 운영 주차를 갖고 와야 함

        // 피크 계산
        Integer todayPeak = findPeakHourToday(todayPeakTimeProjections);
        Integer comparisonPeak = findPeakHourAvg(peakTimeAvgProjections);

        // 피크 차이 이동 방향 계산
        Integer diff = calculateDiff(todayPeak, comparisonPeak);
        ShiftDirection direction = resolveDirection(todayPeak, comparisonPeak);

        // 현재 시점이 비교 피크 이전인지
        boolean beforeComparisonPeak = isBeforeBaselinePeak(anchor, comparisonPeak);

        /*
         * 현재 시점
         * */

        // 없는 슬롯은 null로 채운다
        Map<Integer, PeakTimeItem> todayItemMap =
                todayPeakTimeProjections.stream()
                        .map(PeakTimeItem::of)
                        .collect(Collectors.toMap(PeakTimeItem::timeSlot2H, Function.identity()));

        List<PeakTimeItem> todayItems = new ArrayList<>();

        for (int slot = 0; slot <= 22; slot += 2) {
            todayItems.add(todayItemMap.getOrDefault(slot, new PeakTimeItem(slot, null, null)));
        }

        int currentTimeSlot = TimeUtil.get2HourSlot(anchor);
        PeakTimeItem currentItem = todayItemMap.get(currentTimeSlot);

        double orderCount =
                Optional.ofNullable(currentItem).map(PeakTimeItem::orderCount).orElse(0.0);

        double netAmount =
                Optional.ofNullable(currentItem).map(PeakTimeItem::netAmount).orElse(0.0);

        DashboardPeakTimeResponse dashboard =
                new DashboardPeakTimeResponse(
                        currentTimeSlot,
                        orderCount,
                        netAmount,
                        todayPeak,
                        comparisonPeak,
                        diff,
                        direction,
                        beforeComparisonPeak);

        /*
         * 비교기간
         * */

        // 없는 슬롯은 null로 채운다
        Map<Integer, PeakTimeItem> week4ItemMap =
                peakTimeAvgProjections.stream()
                        .map(
                                p ->
                                        new PeakTimeItem(
                                                p.timeSlot2H(),
                                                (double) p.orderCount() / p.operatingWeeks(),
                                                (double) p.netAmount() / p.operatingWeeks()))
                        .collect(Collectors.toMap(PeakTimeItem::timeSlot2H, Function.identity()));

        List<PeakTimeItem> week4Items = new ArrayList<>();

        for (int slot = 0; slot <= 22; slot += 2) {
            week4Items.add(week4ItemMap.getOrDefault(slot, new PeakTimeItem(slot, null, null)));
        }

        DetailPeakTimeResponse detail =
                new DetailPeakTimeResponse(
                        todayItems,
                        week4Items,
                        todayPeak,
                        comparisonPeak,
                        diff,
                        direction,
                        beforeComparisonPeak);

        return new AnalysisResponse(context.getAnalysisCardCode(), dashboard, detail);
    }

    private Integer findPeakHourToday(List<TodayPeakTimeProjection> list) {

        return list.stream()
                .max(Comparator.comparing(TodayPeakTimeProjection::orderCount))
                .map(TodayPeakTimeProjection::timeSlot2H)
                .orElse(null);
    }

    private Integer findPeakHourAvg(List<PeakTimeAvgProjection> list) {

        return list.stream()
                .max(Comparator.comparing(PeakTimeAvgProjection::orderCount))
                .map(PeakTimeAvgProjection::timeSlot2H)
                .orElse(null);
    }

    private Integer calculateDiff(Integer todayPeak, Integer comparisonPeak) {

        if (todayPeak == null || comparisonPeak == null) return null;

        return Math.abs(todayPeak - comparisonPeak);
    }

    private ShiftDirection resolveDirection(Integer today, Integer comparisonPeak) {

        if (today == null || comparisonPeak == null) return ShiftDirection.UNKNOWN;

        if (today.equals(comparisonPeak)) return ShiftDirection.SAME;

        return today < comparisonPeak ? ShiftDirection.EARLY : ShiftDirection.LATE;
    }

    private boolean isBeforeBaselinePeak(LocalDateTime anchor, Integer comparisonPeak) {

        if (comparisonPeak == null) return false;

        int currentHour = anchor.getHour();

        return currentHour < comparisonPeak;
    }
}
