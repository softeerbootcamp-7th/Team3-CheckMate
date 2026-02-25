package com.checkmate.backend.domain.analysis.context;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public abstract class AnalysisContext {
    private Long storeId;
    private final LocalDateTime anchor;
    private final AnalysisCardCode analysisCardCode;
    private final LocalDate startDate;
    private final LocalDate endDate;
}
