package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.AverageOrderAmountResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_03 (건당 평균가) */
@Component
@RequiredArgsConstructor
@Slf4j
public class AverageOrderAmountProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.SLS_03 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        long currentAverage =
                Optional.ofNullable(
                                salesAnalysisRepository.findAverageOrderAmount(
                                        context.getStoreId(),
                                        context.getStartDate(),
                                        context.getEndDate()))
                        .orElse(0L);

        long comparisonAverage =
                Optional.ofNullable(
                                salesAnalysisRepository.findAverageOrderAmount(
                                        context.getStoreId(),
                                        context.getComparisonStart(),
                                        context.getComparisonEnd()))
                        .orElse(0L);

        long difference = currentAverage - comparisonAverage;

        boolean hasPreviousData = comparisonAverage != 0L;

        AverageOrderAmountResponse response =
                new AverageOrderAmountResponse(currentAverage, difference, hasPreviousData);

        return new AnalysisResponse(context.getAnalysisCardCode(), response, response);
    }
}
