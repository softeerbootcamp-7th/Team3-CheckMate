package com.checkmate.backend.domain.chat.service;

import com.checkmate.backend.domain.chat.dto.request.ChatRequest;
import com.checkmate.backend.domain.chat.dto.response.ChatResponse;
import com.checkmate.backend.global.client.llm.LlmClient;
import com.checkmate.backend.global.client.llm.PromptProvider;
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
                    llmClient.askWithHistoryStream(
                            template, request.history(), request.question(), emitter);
                });

        return emitter;
    }
}
