package com.checkmate.backend.domain.analysis.presenter;

import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;

public interface AnalysisPresenter {

    boolean supports(AnalysisCardCode analysisCardCode);

    AnalysisResponse present(AnalysisCardCode analysisCardCode);
}
