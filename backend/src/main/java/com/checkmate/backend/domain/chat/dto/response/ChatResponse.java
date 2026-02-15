package com.checkmate.backend.domain.chat.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "AI Mate 대화 응답 객체")
public record ChatResponse(
        @Schema(description = "AI가 생성한 답변 내용 (Plain Text)", example = "어쩌구. 저쩌구.") String answer) {}
