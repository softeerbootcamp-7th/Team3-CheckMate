package com.checkmate.backend.global.sse;

import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
@Slf4j
public class SseEventSender {

    private final SseEmitterManager sseEmitterManager;

    public SseEventSender(SseEmitterManager sseEmitterManager) {
        this.sseEmitterManager = sseEmitterManager;
    }

    public void send(Long storeId, String topic, Object data) {

        if (!sseEmitterManager.isSubscribed(storeId, topic)) {
            return; // 구독 안 했으면 안 보냄
        }

        SseEmitter emitter = sseEmitterManager.getEmitter(storeId);
        if (emitter == null) return;

        try {
            emitter.send(SseEmitter.event().name(topic).data(data));
        } catch (IOException e) {
            log.warn(
                    "[send][send failed][storeId= {}, topic= {}] reason={}",
                    storeId,
                    topic,
                    e.getMessage());
            sseEmitterManager.removeClient(storeId);
        }
    }
}
