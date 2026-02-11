package com.checkmate.backend.domain.analysis.context;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class MenuAnalysisContext extends AnalysisContext {

    private final AnalysisCardCode analysisCardCode;
    private final LocalDate startDate;
    private final LocalDate endDate;

    public MenuAnalysisContext(
            Long storeId,
            AnalysisCardCode analysisCardCode,
            LocalDate startDate,
            LocalDate endDate) {
        super(storeId);
        this.analysisCardCode = analysisCardCode;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
