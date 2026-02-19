package com.checkmate.backend.domain.analysis.dto.response.sales;

/** SLS_14_06 (요일별 매출) */
public record SalesByDayItem(String day, double avgNetAmount, long orderCount) {}
