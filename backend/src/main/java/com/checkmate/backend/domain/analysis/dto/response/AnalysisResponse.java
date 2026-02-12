package com.checkmate.backend.domain.analysis.dto.response;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;

public record AnalysisResponse(
        AnalysisCardCode analysisCardCode,
        DashboardAnalysisResponse dashboardAnalysisResponse,
        DetailAnalysisResponse detailAnalysisResponse) {}
