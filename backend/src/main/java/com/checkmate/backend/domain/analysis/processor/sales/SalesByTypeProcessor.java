package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByTypeProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DashboardSalesByTypeResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DetailSalesByTypeResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.SalesByTypeItem;
import com.checkmate.backend.domain.analysis.dto.response.sales.SalesInsight;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_06 (판매유형별 매출) */
@Component
@RequiredArgsConstructor
@Slf4j
public class SalesByTypeProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.SLS_06 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        // 현재 기간 조회
        List<SalesByTypeProjection> currentProjections =
                salesAnalysisRepository.findSalesBySalesType(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        // 비교 기간 조회
        List<SalesByTypeProjection> comparisonProjections =
                salesAnalysisRepository.findSalesBySalesType(
                        context.getStoreId(),
                        context.getComparisonStart(),
                        context.getComparisonEnd());

        long currentTotalNetAmount = totalNetAmount(currentProjections);
        long comparisonTotalNetAmount = totalNetAmount(comparisonProjections);

        // Map<SalesType, Share> 생성
        Map<String, Double> currentShareMap = new HashMap<>();

        for (SalesByTypeProjection item : currentProjections) {
            double share =
                    currentTotalNetAmount == 0
                            ? 0.0
                            : (item.netAmount() * 100.0) / currentTotalNetAmount;
            currentShareMap.put(item.salesType(), share);
        }

        Map<String, Double> comparisonShareMap = new HashMap<>();

        for (SalesByTypeProjection item : comparisonProjections) {
            double share =
                    comparisonTotalNetAmount == 0
                            ? 0.0
                            : (item.netAmount() * 100.0) / comparisonTotalNetAmount;
            comparisonShareMap.put(item.salesType(), share);
        }

        // TopType: 실매출이 가장 높은 SalesType
        SalesByTypeProjection topTypeItem =
                currentProjections.stream()
                        .max(Comparator.comparing(SalesByTypeProjection::netAmount))
                        .orElse(null);

        String topType = topTypeItem == null ? null : topTypeItem.salesType();

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

        // 판매 유형별 리스트
        List<SalesByTypeItem> items =
                currentProjections.stream()
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

        DashboardSalesByTypeResponse dashboardResponse =
                new DashboardSalesByTypeResponse(insight, items);

        DetailSalesByTypeResponse detailResponse = new DetailSalesByTypeResponse(items);

        return new AnalysisResponse(
                context.getAnalysisCardCode(), dashboardResponse, detailResponse);
    }

    private long totalNetAmount(List<SalesByTypeProjection> list) {
        return list.stream().mapToLong(SalesByTypeProjection::netAmount).sum();
    }

    /** 소수점 1자리까지 반올림 */
    private double round(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
