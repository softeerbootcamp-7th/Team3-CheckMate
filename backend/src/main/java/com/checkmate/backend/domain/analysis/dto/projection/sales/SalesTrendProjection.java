package com.checkmate.backend.domain.analysis.dto.projection.sales;

import java.time.LocalDate;

/** SLS_09_04 (일별 매출 추이) SLS_10_07 (주별 매출 추이) SLS_11_07 (월별 매출 추이) SLS_12_01 (연별 매출 추이) */
public interface SalesTrendProjection {
    LocalDate getBucketDate();

    Long getOrderCount();

    Long getNetAmount();
}
