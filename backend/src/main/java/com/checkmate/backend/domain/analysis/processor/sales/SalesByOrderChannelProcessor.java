package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByOrderChannelProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.*;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_07_01 (오늘 주문수단별 매출) */
@Component
@RequiredArgsConstructor
@Slf4j
public class SalesByOrderChannelProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.SLS_07 == analysisCardCode.getMetricCode();
    }

    // TODO: 다른 애들도 insight
    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        // 현재 기간 조회
        List<SalesByOrderChannelProjection> currentProjections =
                salesAnalysisRepository.findSalesByOrderChannel(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        // 비교 기간 조회
        List<SalesByOrderChannelProjection> comparisonProjections =
                salesAnalysisRepository.findSalesByOrderChannel(
                        context.getStoreId(),
                        context.getComparisonStart(),
                        context.getComparisonEnd());

        long currentTotalNetAmount = totalNetAmount(currentProjections);
        long comparisonTotalNetAmount = totalNetAmount(comparisonProjections);

        // Map<OrderChannel, Share> 생성
        Map<String, Double> currentShareMap = new HashMap<>();

        for (SalesByOrderChannelProjection item : currentProjections) {
            double share =
                    currentTotalNetAmount == 0
                            ? 0.0
                            : (item.netAmount() * 100.0) / currentTotalNetAmount;
            currentShareMap.put(item.orderChannel(), share);
        }

        Map<String, Double> comparisonShareMap = new HashMap<>();

        for (SalesByOrderChannelProjection item : comparisonProjections) {
            double share =
                    comparisonTotalNetAmount == 0
                            ? 0.0
                            : (item.netAmount() * 100.0) / comparisonTotalNetAmount;
            comparisonShareMap.put(item.orderChannel(), share);
        }

        // TopType: 실매출이 가장 높은 OrderChannel
        SalesByOrderChannelProjection topTypeItem =
                currentProjections.stream()
                        .max(Comparator.comparing(SalesByOrderChannelProjection::netAmount))
                        .orElse(null);

        String topType = topTypeItem == null ? null : topTypeItem.orderChannel();

        // TopShare = 해당 TopType의 매출 비중 (share)
        double topShare = topType == null ? 0 : currentShareMap.get(topType);

        // 비교 기간 share
        double comparisonShare =
                topType == null ? 0 : comparisonShareMap.getOrDefault(topType, 0.0);

        double deltaShare = topShare - comparisonShare;

        SalesInsight insight =
                new SalesInsight(
                        topType,
                        round(topShare),
                        round(deltaShare),
                        Math.abs(deltaShare) >= 3, // 변화 문구 조건
                        topShare >= 60 // 집중 문구 조건
                        );

        // 주문수단별 리스트
        List<SalesByOrderChannelItem> items =
                currentProjections.stream()
                        .map(
                                item -> {
                                    double currentShare = currentShareMap.get(item.orderChannel());
                                    double previousShare =
                                            comparisonShareMap.getOrDefault(
                                                    item.orderChannel(), 0.0);

                                    return new SalesByOrderChannelItem(
                                            item.orderChannel(),
                                            item.netAmount(),
                                            item.orderCount(),
                                            round(currentShare),
                                            round(currentShare - previousShare));
                                })
                        .toList();

        DashboardSalesByOrderChannelResponse dashboardResponse =
                new DashboardSalesByOrderChannelResponse(insight, items);

        DetailSalesByOrderChannelResponse detailResponse =
                new DetailSalesByOrderChannelResponse(items);

        return new AnalysisResponse(
                context.getAnalysisCardCode(), dashboardResponse, detailResponse);
    }

    private long totalNetAmount(List<SalesByOrderChannelProjection> list) {
        return list.stream().mapToLong(SalesByOrderChannelProjection::netAmount).sum();
    }

    /** 소수점 1자리까지 반올림 */
    private double round(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
