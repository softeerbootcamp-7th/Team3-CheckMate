package com.checkmate.backend.domain.chat.dto.request;

import com.checkmate.backend.domain.chat.dto.Message;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Schema(description = "AI Mate 대화 요청 객체")
public record ChatRequest(
        @Schema(description = "이전 대화 이력") List<Message> history,
        @NotBlank(message = "질문 내용은 비어있을 수 없습니다.")
                @Schema(description = "현재 사장님의 질문", example = "매출 상승 전략 좀 알려줘.")
                String question) {}
