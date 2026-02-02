package com.checkmate.backend.global.sse;

import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
@Slf4j
public class SseEventSender {

    private final SseEmitterManager repository;

    public SseEventSender(SseEmitterManager repository) {
        this.repository = repository;
    }

    public void send(Long storeId, String topic, Object data) {

        if (!repository.isSubscribed(storeId, topic)) {
            return; // 구독 안 했으면 안 보냄
        }

        SseEmitter emitter = repository.getEmitter(storeId);
        if (emitter == null) return;

        try {
            emitter.send(SseEmitter.event().name(topic).data(data));
        } catch (IOException e) {
            log.warn(
                    "[send][send failed][storeId= {}, topic= {}] reason={}",
                    storeId,
                    topic,
                    e.getMessage());
            repository.removeClient(storeId);
        }
    }
}
