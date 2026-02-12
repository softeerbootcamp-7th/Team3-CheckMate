package com.checkmate.backend.domain.analysis.processor;

import com.checkmate.backend.domain.analysis.context.AnalysisContext;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;

public interface AnalysisProcessor<T extends AnalysisContext> {
    boolean supports(AnalysisCardCode analysisCardCode);

    AnalysisResponse process(T context);
}
