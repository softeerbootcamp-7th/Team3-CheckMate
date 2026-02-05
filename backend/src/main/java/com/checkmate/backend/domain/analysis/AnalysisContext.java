package com.checkmate.backend.domain.analysis;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public abstract class AnalysisContext {
    private Long storeId;
}
