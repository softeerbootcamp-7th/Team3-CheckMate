package com.checkmate.backend.domain.analysis.context;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class SalesAnalysisContext extends AnalysisContext {

    private final LocalDate anchor;
    private final LocalDate comparisonStart;
    private final LocalDate comparisonEnd;

    public SalesAnalysisContext(
            Long storeId,
            AnalysisCardCode analysisCardCode,
            LocalDate startDate,
            LocalDate endDate,
            LocalDateTime anchor,
            LocalDate comparisonStart,
            LocalDate comparisonEnd) {
        super(storeId, analysisCardCode, startDate, endDate);

        this.anchor = anchor;
        this.comparisonStart = comparisonStart;
        this.comparisonEnd = comparisonEnd;
    }
}
