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

    public void addEmitter(Long storeId, SseEmitter newEmitter) {
        emitters.compute(
                storeId,
                (key, existingEmitter) -> {
                    if (existingEmitter != null) {
                        try {
                            existingEmitter.complete(); // 기존 연결 종료
                            log.info("[SSE] Existing emitter completed for storeId={}", storeId);
                        } catch (Exception e) {
                            log.warn(
                                    "[SSE] Failed to complete existing emitter for storeId={}",
                                    storeId,
                                    e);
                        }
                        clientTopics.remove(storeId); // 기존 topic만 정리
                    }
                    return newEmitter; // 새 Emitter 등록
                });

        // Emitter 이벤트에서는 Map 제거 X
        newEmitter.onCompletion(() -> log.info("[SSE][disconnect][storeId={}]", storeId));
        newEmitter.onTimeout(() -> log.info("[SSE][timeout][storeId={}]", storeId));
        newEmitter.onError(
                e -> log.warn("[SSE][error][storeId={} reason={}]", storeId, e.getMessage()));
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
