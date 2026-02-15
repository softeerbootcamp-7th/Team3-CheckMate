package com.checkmate.backend.global.client.llm;

import com.checkmate.backend.domain.chat.dto.Message;
import java.util.List;

public interface LlmClient {
    /**
     * @param systemInstruction 시스템 지침
     * @param userMessage 사용자 메시지 또는 데이터
     * @return LLM 응답 텍스트
     */
    String ask(String systemInstruction, String userMessage);

    /**
     * @param systemInstruction 시스템 지침
     * @param history 이전 메시지 히스토리
     * @param currentQuestion 현재 질문 또는 데이터
     * @return LLM 응답 텍스트
     */
    String askWithHistory(String systemInstruction, List<Message> history, String currentQuestion);
}
