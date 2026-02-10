package com.checkmate.backend.domain.analysis.result;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;

public interface AnalysisResult {

    AnalysisCardCode getCardCode();

    Object getPayload(); // 실제 데이터
}
