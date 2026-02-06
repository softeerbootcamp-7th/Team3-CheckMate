package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ChartType {
    BAR("막대 그래프"),
    LINE("꺾은선 그래프"),
    DONUT("도넛 그래프"),
    STACKED_BAR("막대 비율 그래프"),
    METRIC_CARD("매트릭 카드"),
    RANKING("랭킹 리스트"),
    NONE("없음");

    private final String description;
}
