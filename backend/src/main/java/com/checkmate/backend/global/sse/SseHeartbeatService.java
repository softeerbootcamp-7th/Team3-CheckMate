package com.checkmate.backend.global.sse;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
@Slf4j
public class SseHeartbeatService {
    private final SseEmitterManager sseEmitterManager;

    public void sendHeartbeat() {
        Map<Long, SseSession> emitters = sseEmitterManager.getEmitters();

        emitters.forEach(
                (storeId, sseSession) -> {
                    String emitterId = sseSession.emitterId();
                    SseEmitter emitter = sseSession.emitter();

                    log.info("[sendHeartbeat][start][storeId={}, emitterId= {}]", storeId, emitterId);
                    try {
                        emitter.send(SseEmitter.event().comment("hb"));
                        log.info("[sendHeartbeat][success][storeId={}, emitterId= {}]", storeId, emitterId);
                    } catch (Exception e) {
                        log.warn(
                                "[sendHeartbeat][failed][storeId={}, emitterId= {}][reason={}]",
                                storeId,
                                emitterId,
                                e.getMessage());
                        sseEmitterManager.removeClient(storeId);
                    }
                });
    }
}
