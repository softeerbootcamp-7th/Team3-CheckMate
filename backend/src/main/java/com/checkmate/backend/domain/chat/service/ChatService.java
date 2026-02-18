package com.checkmate.backend.domain.chat.service;

import com.checkmate.backend.domain.chat.dto.request.ChatRequest;
import com.checkmate.backend.domain.chat.dto.response.ChatResponse;
import com.checkmate.backend.global.client.llm.LlmClient;
import com.checkmate.backend.global.client.llm.PromptProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final LlmClient llmClient;
    private final PromptProvider promptProvider;

    public ChatResponse getChatResponse(ChatRequest request) {
        String template = promptProvider.getPrompt(PromptProvider.PromptType.CHATBOT);

        String aiAnswer = llmClient.askWithHistory(template, request.history(), request.question());

        return new ChatResponse(aiAnswer);
    }
}
