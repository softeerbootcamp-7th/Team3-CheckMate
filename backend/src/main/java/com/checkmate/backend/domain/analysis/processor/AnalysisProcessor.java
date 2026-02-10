package com.checkmate.backend.domain.analysis.processor;

import com.checkmate.backend.domain.analysis.context.AnalysisContext;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.result.AnalysisResult;

public interface AnalysisProcessor<T extends AnalysisContext> {
    boolean supports(AnalysisCardCode analysisCardCode);

    AnalysisResult process(T context);
}
