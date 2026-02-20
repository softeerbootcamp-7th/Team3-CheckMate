package com.checkmate.backend.global.client.llm;

import com.checkmate.backend.domain.chat.dto.Message;
import java.util.List;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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

    /**
     * @param systemInstruction 시스템 지침
     * @param menuName 메뉴 이름
     * @return LLM이 생성한 식재료 목록 텍스트
     */
    String generateIngredients(String systemInstruction, String menuName);

    /**
     * @param systemInstruction 시스템 지침
     * @param history 이전 메시지 히스토리
     * @param currentQuestion 현재 질문 또는 데이터
     * @param emitter SSE 응답 스트림을 위한 Emitter
     */
    void askWithHistoryStream(
            String systemInstruction,
            List<Message> history,
            String currentQuestion,
            SseEmitter emitter);
}
