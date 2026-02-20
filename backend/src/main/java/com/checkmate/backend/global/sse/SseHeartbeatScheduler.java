package com.checkmate.backend.global.sse;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SseHeartbeatScheduler {
    private final SseHeartbeatService heartbeatService;

    @Scheduled(fixedRate = 30000)
    public void heartbeat() {
        heartbeatService.sendHeartbeat();
    }
}
