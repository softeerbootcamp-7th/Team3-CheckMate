package com.checkmate.backend.global.sse;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
@Slf4j
public class SseEmitterManager {

    // StoreId -> SseEmitter
    @Getter private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    // StoreId -> subscribed topics
    private final Map<Long, Set<AnalysisCardCode>> clientTopics = new ConcurrentHashMap<>();

    /**
     * 새로운 SSE Emitter 등록
     * 기존 Emitter가 있으면 종료 후 제거
     */
    public void addEmitter(Long storeId, SseEmitter emitter) {
        emitters.compute(storeId, (key, existingEmitter) -> {
            if (existingEmitter != null) {
                try {
                    existingEmitter.complete(); // 기존 연결 종료
                    log.info("[SSE] Existing emitter completed for storeId={}", storeId);
                } catch (Exception e) {
                    log.warn("[SSE] Failed to complete existing emitter for storeId={}", storeId, e);
                }
                clientTopics.remove(storeId);
            }
            return emitter; // 새로운 Emitter 등록
        });
    }

    public SseEmitter getEmitter(Long storeId) {
        return emitters.get(storeId);
    }

    public void removeClient(Long storeId) {
        clientTopics.remove(storeId);
        emitters.remove(storeId);
    }

    public void subscribe(Long storeId, SubscriptionTopicsRequest SubscriptionTopicsRequest) {

        List<AnalysisCardCode> topics = SubscriptionTopicsRequest.topics();

        for (AnalysisCardCode topic : topics) {
            clientTopics.computeIfAbsent(storeId, k -> ConcurrentHashMap.newKeySet()).add(topic);
        }
    }

    public void unsubscribe(Long storeId, SubscriptionTopicsRequest request) {

        Set<AnalysisCardCode> subscribedTopics = clientTopics.get(storeId);
        if (subscribedTopics == null) {
            return;
        }

        if (request == null || request.topics() == null || request.topics().isEmpty()) {
            // 전체 구독 해제
            clientTopics.remove(storeId);
            return;
        }

        // 선택 구독 해제
        request.topics().forEach(subscribedTopics::remove);

        // 남은 topic 없으면 map에서도 제거
        if (subscribedTopics.isEmpty()) {
            clientTopics.remove(storeId);
        }
    }

    public boolean isSubscribed(Long storeId, AnalysisCardCode topic) {
        return clientTopics.getOrDefault(storeId, Set.of()).contains(topic);
    }

    public Set<AnalysisCardCode> getSubscribedTopics(Long storeId) {
        return new HashSet<>(clientTopics.getOrDefault(storeId, Set.of()));
    }
}
