package com.checkmate.backend.api;

import io.swagger.v3.oas.annotations.media.Schema;

public record TestResponseDTO(
    @Schema(description = "옆은 필드명!") Integer integerrrr,
    @Schema(description = "위는 타입!") String sssstring) {}
