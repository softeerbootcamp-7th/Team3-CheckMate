package com.checkmate.backend.global.client.llm;

public interface LlmClient {
    /**
     * @param systemInstruction 시스템 지침
     * @param userMessage 사용자 메시지 또는 데이터
     * @return LLM 응답 텍스트
     */
    String ask(String systemInstruction, String userMessage);
}
