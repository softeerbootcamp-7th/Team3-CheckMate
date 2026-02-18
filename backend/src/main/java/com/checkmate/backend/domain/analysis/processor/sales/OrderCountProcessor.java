package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.OrderCountResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_02 (주문건수) */
@Component
@RequiredArgsConstructor
@Slf4j
public class OrderCountProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.SLS_02 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        Long currentOrderCount =
                salesAnalysisRepository.countOrders(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        Long comparisonOrderCount =
                salesAnalysisRepository.countOrders(
                        context.getStoreId(),
                        context.getComparisonStart(),
                        context.getComparisonEnd());

        // null 방지
        currentOrderCount = Optional.ofNullable(currentOrderCount).orElse(0L);
        comparisonOrderCount = Optional.ofNullable(comparisonOrderCount).orElse(0L);

        boolean hasPreviousData = comparisonOrderCount != 0L;

        long differenceCount = currentOrderCount - comparisonOrderCount;

        double changeRate;

        if (comparisonOrderCount == 0) {
            changeRate = 0.0;
        } else {
            changeRate = (differenceCount * 100.0) / comparisonOrderCount;
        }

        OrderCountResponse response =
                new OrderCountResponse(
                        currentOrderCount, differenceCount, changeRate, hasPreviousData);

        return new AnalysisResponse(context.getAnalysisCardCode(), response, response);
    }
}
