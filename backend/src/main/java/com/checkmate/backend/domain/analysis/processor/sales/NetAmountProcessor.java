package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.response.sales.NetAmountResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.analysis.result.AnalysisResult;
import com.checkmate.backend.domain.analysis.result.DefaultAnalysisResult;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_01 (실매출) */
@Component
@RequiredArgsConstructor
@Slf4j
public class NetAmountProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.SLS_01 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResult process(SalesAnalysisContext context) {

        Long currentNetAmount =
                salesAnalysisRepository.findTotalNetAmount(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        Long comparisonNetAmount =
                salesAnalysisRepository.findTotalNetAmount(
                        context.getStoreId(),
                        context.getComparisonStart(),
                        context.getComparisonEnd());

        // null 방지
        currentNetAmount = Optional.ofNullable(currentNetAmount).orElse(0L);
        comparisonNetAmount = Optional.ofNullable(comparisonNetAmount).orElse(0L);

        long differenceAmount = currentNetAmount - comparisonNetAmount;

        double changeRate;

        if (comparisonNetAmount == 0) {
            changeRate = 0.0;
        } else {
            changeRate = (differenceAmount * 100.0) / comparisonNetAmount;
        }

        NetAmountResponse response =
                new NetAmountResponse(currentNetAmount, differenceAmount, changeRate);

        return new DefaultAnalysisResult<>(context.getAnalysisCardCode(), response);
    }
}
