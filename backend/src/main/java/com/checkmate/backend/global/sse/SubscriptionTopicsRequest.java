package com.checkmate.backend.global.sse;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record SubscriptionTopicsRequest(
        @Schema(description = "topic 리스트") @NotNull @Size(min = 1) List<AnalysisCardCode> topics) {}
