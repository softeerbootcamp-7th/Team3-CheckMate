package com.checkmate.backend.domain.analysis.dto.projection;

/** MNU_02 (카테코리별 매출) */
public record CategorySalesProjection(String category, Long totalSalesAmount) {}
