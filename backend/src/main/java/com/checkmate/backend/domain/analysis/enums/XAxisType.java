package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum XAxisType {
    // === 시간 관련 ===
    TIME("시간 (시/일/주/월/년/요일)"),

    // === 매출 관련 ===
    SALES_TYPE("판매유형 (홀/포장/배달)"),
    ORDER_METHOD("주문수단 (POS/키오스크/배달앱)"),
    PAYMENT_METHOD("결제수단 (카드/현금/기타)"),

    // === 메뉴/재료 관련 ===
    MENU("메뉴명"),
    CATEGORY("카테고리명"),
    INGREDIENT("식자재명"),
    UNIT("단위 (kg/g/l/ml)"),

    // === 날씨 관련 ===
    WEATHER("날씨 상태 (강수/비강수)"),
    TEMPERATURE("기온 (구간별)"),

    NONE("없음");

    private final String description;
}
