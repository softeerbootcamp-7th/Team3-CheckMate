package com.checkmate.backend.domain.analysis.context;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class MenuAnalysisContext extends AnalysisContext {

    public MenuAnalysisContext(
            Long storeId,
            LocalDateTime anchor,
            AnalysisCardCode analysisCardCode,
            LocalDate startDate,
            LocalDate endDate) {
        super(storeId, anchor, analysisCardCode, startDate, endDate);
    }
}
