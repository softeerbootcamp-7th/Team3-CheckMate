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


        if (!sseEmitterManager.isSubscribed(storeId, topic)) {
            log.warn("[send][구독 안 함][storeId= {}]", storeId);
            return; // 구독 안 했으면 안 보냄
        }

        SseSession sseSession = sseEmitterManager.getEmitter(storeId);
        if (sseSession == null) {
            log.warn("[send][sseSession not found][storeId= {}]", storeId);
            return;
        }

        try {
            SseEmitter emitter = sseSession.emitter();
            String emitterId = sseSession.emitterId();

            log.info("[send][storeId= {},emitterId= {},  data= {}]", storeId, emitterId, data);
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
