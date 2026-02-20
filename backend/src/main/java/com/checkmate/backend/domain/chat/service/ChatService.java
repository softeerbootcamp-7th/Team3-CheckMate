package com.checkmate.backend.domain.chat.service;

import com.checkmate.backend.domain.chat.dto.request.ChatRequest;
import com.checkmate.backend.domain.chat.dto.response.ChatResponse;
import com.checkmate.backend.global.client.llm.LlmClient;
import com.checkmate.backend.global.client.llm.PromptProvider;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final LlmClient llmClient;
    private final PromptProvider promptProvider;

    public ChatResponse getChatResponse(ChatRequest request) {
        String template = promptProvider.getPrompt(PromptProvider.PromptType.CHATBOT);

        String aiAnswer = llmClient.askWithHistory(template, request.history(), request.question());

        return new ChatResponse(aiAnswer);
    }

    public SseEmitter getChatResponseStream(ChatRequest request) {
        SseEmitter emitter = new SseEmitter(60 * 1000L);

        emitter.onCompletion(() -> log.info("Stream completed"));
        emitter.onTimeout(
                () -> {
                    log.warn("Stream timeout");
                    emitter.complete();
                });
        emitter.onError((e) -> log.error("Emitter error", e));

        String template = promptProvider.getPrompt(PromptProvider.PromptType.CHATBOT);

        CompletableFuture.runAsync(
                () -> {
                    try {
                        llmClient.askWithHistoryStream(
                                template, request.history(), request.question(), emitter);
                    } catch (Exception e) {
                        log.error("비동기 스트리밍 작업 중 예상치 못한 에러 발생", e);
                        try {
                            emitter.send(
                                    SseEmitter.event().name("error").data("알 수 없는 서버 오류가 발생했습니다."));
                            emitter.complete();
                        } catch (IOException ioe) {
                            log.error("에러 메시지 전송 실패", ioe);
                        } catch (IllegalStateException ise) {
                            log.warn("Emitter가 이미 완료된 상태입니다.", ise);
                        }
                    }
                });

        return emitter;
    }
}
