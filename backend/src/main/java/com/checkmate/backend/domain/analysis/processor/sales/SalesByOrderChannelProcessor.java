package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByOrderChannelProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.SalesByOrderChannelItem;
import com.checkmate.backend.domain.analysis.dto.response.sales.SalesByOrderChannelResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_07_02, SLS_07_03 (이번주, 이번달 주문수단별 매출) */
@Component
@RequiredArgsConstructor
@Slf4j
public class SalesByOrderChannelProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCardCode.SLS_07_02 == analysisCardCode
                || AnalysisCardCode.SLS_07_03 == analysisCardCode;
    }

    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        // 현재 기간 조회
        List<SalesByOrderChannelProjection> currentProjections =
                salesAnalysisRepository.findSalesByOrderChannel(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        long currentTotalNetAmount = totalNetAmount(currentProjections);

        // Map<OrderChannel, Share> 생성
        Map<String, Double> currentShareMap = new HashMap<>();

        for (SalesByOrderChannelProjection item : currentProjections) {
            double share =
                    currentTotalNetAmount == 0
                            ? 0.0
                            : (item.netAmount() * 100.0) / currentTotalNetAmount;
            currentShareMap.put(item.orderChannel(), share);
        }

        // 주문수단별 리스트
        List<SalesByOrderChannelItem> items =
                currentProjections.stream()
                        .map(
                                item -> {
                                    double currentShare = currentShareMap.get(item.orderChannel());

                                    return new SalesByOrderChannelItem(
                                            item.orderChannel(),
                                            item.netAmount(),
                                            item.orderCount(),
                                            round(currentShare),
                                            0.0);
                                })
                        .toList();

        SalesByOrderChannelResponse response = new SalesByOrderChannelResponse(items);

        return new AnalysisResponse(context.getAnalysisCardCode(), response, response);
    }

    private long totalNetAmount(List<SalesByOrderChannelProjection> list) {
        return list.stream().mapToLong(SalesByOrderChannelProjection::netAmount).sum();
    }

    /** 소수점 1자리까지 반올림 */
    private double round(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
