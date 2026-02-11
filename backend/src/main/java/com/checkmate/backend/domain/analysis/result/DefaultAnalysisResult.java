package com.checkmate.backend.domain.analysis.result;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;

public record DefaultAnalysisResult<T>(AnalysisCardCode analysisCardCode, T payload)
        implements AnalysisResult {

    @Override
    public AnalysisCardCode getCardCode() {
        return analysisCardCode;
    }

    @Override
    public Object getPayload() {
        return payload;
    }
}
