package com.checkmate.backend.domain.analysis.dto.response;

/** MNU_01(메뉴별 매출 랭킹) */
public record MenuSalesResponse(
        String menuName, // 메뉴 이름
        Long totalSalesAmount, // 총 매출액
        Long orderCount // 판매 건수
        ) {}
