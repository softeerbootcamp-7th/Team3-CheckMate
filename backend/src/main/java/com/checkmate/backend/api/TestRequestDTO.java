package com.checkmate.backend.api;

import io.swagger.v3.oas.annotations.media.Schema;

public record TestRequestDTO(
    @Schema(description = "뭘까요?") String aaa,
    @Schema(description = "description 입니다!") Integer bbbb) {}
