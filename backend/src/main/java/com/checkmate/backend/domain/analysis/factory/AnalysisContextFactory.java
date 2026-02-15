package com.checkmate.backend.domain.analysis.factory;

import com.checkmate.backend.domain.analysis.context.AnalysisContext;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.order.OrderCreatedEvent;
import java.time.LocalDate;

public interface AnalysisContextFactory {
    boolean supports(AnalysisCardCode analysisCardCode);

    AnalysisContext create(AnalysisCardCode analysisCardCode, OrderCreatedEvent event);

    AnalysisContext create(
            AnalysisCardCode analysisCardCode, Long storeId, LocalDate start, LocalDate end);
}
