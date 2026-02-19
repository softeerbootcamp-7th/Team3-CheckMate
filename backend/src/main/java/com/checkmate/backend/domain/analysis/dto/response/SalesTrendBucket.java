package com.checkmate.backend.domain.analysis.dto.response;

import java.time.LocalDate;

/** SLS_09 (일별 매출 추이) SLS_10 (주별 매출 추이) SLS_11 (월별 매출 추이) SLS_12 (연별 매출 추이) */
public record SalesTrendBucket(LocalDate bucket, String label, long netAmount, long orderCount) {}
