package com.checkmate.backend.global.sse;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
public class SseEmitterManager {

    // StoreId -> SseEmitter
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

    public void subscribe(Long storeId, AnalysisCardCode topic) {
        clientTopics.computeIfAbsent(storeId, k -> ConcurrentHashMap.newKeySet()).add(topic);
    }

    public void unsubscribe(Long storeId, AnalysisCardCode topic) {
        Set<AnalysisCardCode> topics = clientTopics.get(storeId);
        if (topics == null) {
            return;
        }

        topics.remove(topic);

        // 토픽이 하나도 없으면 map에서도 제거 (선택)
        if (topics.isEmpty()) {
            clientTopics.remove(storeId);
        }
    }

    public void unsubscribeAll(Long storeId) {
        clientTopics.remove(storeId);
    }

    public boolean isSubscribed(Long storeId, AnalysisCardCode topic) {
        return clientTopics.getOrDefault(storeId, Set.of()).contains(topic);
    }

    public Set<AnalysisCardCode> getSubscribedTopics(Long storeId) {
        return new HashSet<>(clientTopics.getOrDefault(storeId, Set.of()));
    }
}
