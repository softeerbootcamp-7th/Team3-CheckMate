package com.checkmate.backend.domain.report.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReportType {
    DAILY("하루"),
    MONTHLY("월간");

    private final String description;
}
