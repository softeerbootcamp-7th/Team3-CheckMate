package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.sales.GrossAmountProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.GrossAmountResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** SLS_04 (총매출) */
@Component
@RequiredArgsConstructor
@Slf4j
public class GrossAmountProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.SLS_04 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        GrossAmountProjection projection =
                salesAnalysisRepository.findGrossAmount(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        long grossAmount =
                projection == null ? 0L : Optional.ofNullable(projection.grossAmount()).orElse(0L);

        long orderCount =
                projection == null ? 0L : Optional.ofNullable(projection.orderCount()).orElse(0L);

        GrossAmountResponse response = new GrossAmountResponse(grossAmount, orderCount);

        return new AnalysisResponse(context.getAnalysisCardCode(), response, response);
    }
}
