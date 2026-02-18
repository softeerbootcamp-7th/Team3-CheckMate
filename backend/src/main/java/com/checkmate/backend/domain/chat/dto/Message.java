package com.checkmate.backend.domain.chat.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "대화 메시지 단위")
public record Message(
        @Schema(description = "메시지 발화자 역할 (user: 사용자, assistant: AI)", example = "user")
                String role,
        @Schema(description = "메시지 내용", example = "오늘 매출 현황 좀 알려줘.") String content) {}
