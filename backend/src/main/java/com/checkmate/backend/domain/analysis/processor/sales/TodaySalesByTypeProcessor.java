package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.SalesByType;
import com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByTypeProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DashboardTodaySalesByTypeResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DetailTodaySalesByTypeResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.SalesByTypeItem;
import com.checkmate.backend.domain.analysis.dto.response.sales.SalesInsight;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.enums.SalesType;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_06_01 (오늘 판매유형별 매출) */
@Component
@RequiredArgsConstructor
@Slf4j
public class TodaySalesByTypeProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCardCode.SLS_06_01 == analysisCardCode;
    }

    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        // 현재 기간 조회
        List<SalesByTypeProjection> currentProjections =
                salesAnalysisRepository.findSalesBySalesType(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        List<SalesByType> current = toItemList(currentProjections);

        // 비교 기간 조회
        List<SalesByTypeProjection> comparisonProjections =
                salesAnalysisRepository.findSalesBySalesType(
                        context.getStoreId(),
                        context.getComparisonStart(),
                        context.getComparisonEnd());

        List<SalesByType> comparison = toItemList(comparisonProjections);

        long currentTotalNetAmount = totalNetAmount(current);
        long comparisonTotalNetAmount = totalNetAmount(comparison);

        // Map<SalesType, Share> 생성
        Map<SalesType, Double> currentShareMap = new EnumMap<>(SalesType.class);

        for (SalesByType item : current) {
            double share =
                    currentTotalNetAmount == 0
                            ? 0.0
                            : (item.netAmount() * 100.0) / currentTotalNetAmount;
            currentShareMap.put(item.salesType(), share);
        }

        Map<SalesType, Double> comparisonShareMap = new EnumMap<>(SalesType.class);

        for (SalesByType item : comparison) {
            double share =
                    comparisonTotalNetAmount == 0
                            ? 0.0
                            : (item.netAmount() * 100.0) / comparisonTotalNetAmount;
            comparisonShareMap.put(item.salesType(), share);
        }

        // TopType: 실매출이 가장 높은 SalesType
        SalesByType topTypeItem =
                current.stream().max(Comparator.comparing(SalesByType::netAmount)).orElse(null);

        SalesType topType = topTypeItem == null ? null : topTypeItem.salesType();

        // TopShare = 해당 TopType의 매출 비중 (share)
        double topShare = topType == null ? 0 : currentShareMap.get(topType);

        // 비교 기간 share
        double comparisonShare =
                topType == null ? 0 : comparisonShareMap.getOrDefault(topType, 0.0);

        double deltaShare = topShare - comparisonShare;

        SalesInsight insight =
                new SalesInsight(
                        topType.getValue(),
                        round(topShare),
                        round(deltaShare),
                        Math.abs(deltaShare) >= 3, // 변화 문구 조건
                        topShare >= 60 // 집중 문구 조건
                        );

        // 판매 유형별 리스트
        List<SalesByTypeItem> items =
                current.stream()
                        .map(
                                item -> {
                                    double currentShare = currentShareMap.get(item.salesType());
                                    double previousShare =
                                            comparisonShareMap.getOrDefault(item.salesType(), 0.0);

                                    return new SalesByTypeItem(
                                            item.salesType(),
                                            item.netAmount(),
                                            item.orderCount(),
                                            round(currentShare),
                                            round(currentShare - previousShare));
                                })
                        .toList();

        DashboardTodaySalesByTypeResponse dashboardResponse =
                new DashboardTodaySalesByTypeResponse(insight, items);

        DetailTodaySalesByTypeResponse detailResponse = new DetailTodaySalesByTypeResponse(items);

        return new AnalysisResponse(
                context.getAnalysisCardCode(), dashboardResponse, detailResponse);
    }

    private List<SalesByType> toItemList(List<SalesByTypeProjection> projections) {

        List<SalesByType> result = new ArrayList<>();

        for (SalesByTypeProjection p : projections) {

            SalesType salesType = SalesType.fromValue(p.salesType());

            if (salesType == null) {
                log.warn("[TodaySalesByTypeProcessor] Unknown salesType = {}", p.salesType());
                continue;
            }

            long amount = Optional.ofNullable(p.totalNetAmount()).orElse(0L);
            long count = Optional.ofNullable(p.orderCount()).orElse(0L);

            result.add(new SalesByType(salesType, amount, count));
        }

        return result;
    }

    private long totalNetAmount(List<SalesByType> list) {
        return list.stream().mapToLong(SalesByType::netAmount).sum();
    }

    /** 소수점 1자리까지 반올림 */
    private double round(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
