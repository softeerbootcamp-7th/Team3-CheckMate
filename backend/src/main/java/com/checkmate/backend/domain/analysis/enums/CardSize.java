package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CardSize {
    SIZE_1X1(1, 1),
    SIZE_1X2(1, 2),
    SIZE_2X1(2, 1),
    SIZE_3X1(3, 1);

    private final int width;
    private final int height;
}
