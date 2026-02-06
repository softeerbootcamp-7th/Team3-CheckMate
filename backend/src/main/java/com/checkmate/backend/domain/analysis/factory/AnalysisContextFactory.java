package com.checkmate.backend.domain.analysis.factory;

import com.checkmate.backend.domain.analysis.context.AnalysisContext;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.order.OrderCreatedEvent;

public interface AnalysisContextFactory {
    boolean supports(AnalysisCardCode cardCode);

    AnalysisContext create(AnalysisCardCode cardCode, OrderCreatedEvent event);
}
