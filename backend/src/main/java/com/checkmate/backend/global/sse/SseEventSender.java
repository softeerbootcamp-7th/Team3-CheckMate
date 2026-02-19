package com.checkmate.backend.global.sse;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
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

    public void send(Long storeId, AnalysisCardCode topic, Object data) {
        log.info("[send][storeId= {}, data= {}]", storeId, data);

        if (!sseEmitterManager.isSubscribed(storeId, topic)) {
            log.warn("[send][구독 안 함][storeId= {}]", storeId);
            return; // 구독 안 했으면 안 보냄
        }

        SseEmitter emitter = sseEmitterManager.getEmitter(storeId);
        if (emitter == null) {
            log.warn("[send][emitter not found][storeId= {}]", storeId);
        }

        try {
            emitter.send(SseEmitter.event().name(topic.name()).data(data));
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
