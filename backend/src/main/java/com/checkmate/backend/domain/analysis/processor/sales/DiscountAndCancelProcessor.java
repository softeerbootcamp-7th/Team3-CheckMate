package com.checkmate.backend.domain.analysis.processor.sales;

import com.checkmate.backend.domain.analysis.context.SalesAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.sales.DiscountAndCancelResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.SalesAnalysisRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

/** SLS_05 (할인 & 취소) */
@Component
@RequiredArgsConstructor
@Slf4j
public class DiscountAndCancelProcessor implements AnalysisProcessor<SalesAnalysisContext> {
    private final SalesAnalysisRepository salesAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.SLS_05 == analysisCardCode.getMetricCode();
    }

    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    @Override
    public AnalysisResponse process(SalesAnalysisContext context) {

        // 할인 건수
        Long discountOrders =
                salesAnalysisRepository.countDiscountOrders(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        discountOrders = Optional.ofNullable(discountOrders).orElse(0L);

        // 취소 건수
        Long countCanceledOrders =
                salesAnalysisRepository.countCanceledOrders(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        countCanceledOrders = Optional.ofNullable(countCanceledOrders).orElse(0L);

        // 할인
        Long discountAmount =
                salesAnalysisRepository.findDiscountAmount(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());
        discountAmount = Optional.ofNullable(discountAmount).orElse(0L);

        // 취소
        Long canceledAmount =
                salesAnalysisRepository.findCanceledAmount(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());
        canceledAmount = Optional.ofNullable(canceledAmount).orElse(0L);

        DiscountAndCancelResponse response =
                new DiscountAndCancelResponse(
                        discountOrders, countCanceledOrders, discountAmount, canceledAmount);

        return new AnalysisResponse(context.getAnalysisCardCode(), response, response);
    }
}
