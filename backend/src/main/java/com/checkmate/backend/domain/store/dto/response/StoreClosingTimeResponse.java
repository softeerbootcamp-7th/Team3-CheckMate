package com.checkmate.backend.domain.store.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

public record StoreClosingTimeResponse(
        @Schema(description = "다음 마감 일시", example = "2026-02-19T21:00:00")
                LocalDateTime nextClosingTime) {}
