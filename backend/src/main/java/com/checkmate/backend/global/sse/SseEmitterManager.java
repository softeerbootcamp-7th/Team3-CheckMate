package com.checkmate.backend.global.sse;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import lombok.Getter;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
public class SseEmitterManager {

    // StoreId -> SseEmitter
    @Getter
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    // StoreId -> subscribed topics
    private final Map<Long, Set<AnalysisCardCode>> clientTopics = new ConcurrentHashMap<>();

    public void addEmitter(Long storeId, SseEmitter emitter) {
        emitters.put(storeId, emitter);
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
