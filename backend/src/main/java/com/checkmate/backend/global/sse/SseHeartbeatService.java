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
        Map<Long, SseEmitter> emitters = sseEmitterManager.getEmitters();

        emitters.forEach(
                (storeId, emitter) -> {
                    log.info("[sendHeartbeat][start][storeId={}]", storeId);
                    try {
                        emitter.send(SseEmitter.event().comment("hb"));
                        log.info("[sendHeartbeat][success][storeId={}]", storeId);
                    } catch (Exception e) {
                        log.warn(
                                "[sendHeartbeat][failed][storeId={}][reason={}]",
                                storeId,
                                e.getMessage());
                        sseEmitterManager.removeClient(storeId);
                    }
                });
    }
}
