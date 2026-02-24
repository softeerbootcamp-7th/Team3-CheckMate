package com.checkmate.backend.global.sse;

import static com.checkmate.backend.global.response.ErrorStatus.SUBSCRIBE_WITHOUT_SSE;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.global.exception.BadRequestException;
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
    @Getter private final Map<Long, SseSession> emitters = new ConcurrentHashMap<>();

    // StoreId -> subscribed topics
    private final Map<Long, Set<AnalysisCardCode>> clientTopics = new ConcurrentHashMap<>();

    public SseEmitter addEmitter(Long storeId) {
        // 타임아웃 1시간
        SseEmitter emitter = new SseEmitter(60 * 60_000L);
        String emitterId = UUID.randomUUID().toString();

        log.info("[SSE][connect][storeId= {}, emitterId= {}]", storeId, emitterId);

        emitters.compute(
                storeId,
                (key, existingSession) -> {
                    if (existingSession != null) {
                        String existingEmitterId = existingSession.emitterId();
                        SseEmitter existingEmitter = existingSession.emitter();

                        try {

                            existingEmitter.complete(); // 기존 연결 종료

                            log.info(
                                    "[SSE][Existing emitter completed][storeId={}, existing EmitterId= {}]",
                                    storeId,
                                    existingEmitterId);
                        } catch (Exception e) {
                            log.warn(
                                    "[SSE][Failed to complete existing emitter][storeId={}, existing EmitterId= {}]",
                                    storeId,
                                    existingEmitterId,
                                    e);
                        }
                    }
                    return new SseSession(emitterId, emitter); // 새 Emitter 등록
                });

        emitter.onCompletion(
                () -> {
                    log.info("[onCompletion][storeId={}, emitterId={}]", storeId, emitterId);

                    // emitter 제거
                    emitters.computeIfPresent(
                            storeId,
                            (key, session) ->
                                    session.emitterId().equals(emitterId) ? null : session);

                    // emitter 없으면 topics 제거
                    emitters.compute(
                            storeId,
                            (key, session) -> {
                                if (session == null) {
                                    clientTopics.remove(storeId);
                                    log.info("[onCompletion][topics removed][storeId={}]", storeId);
                                }
                                return session;
                            });
                });

        emitter.onTimeout(
                () -> log.info("[onTimeout][storeId={}, emitterId={}]", storeId, emitterId));
        emitter.onError(e -> log.warn("[onError][storeId={} reason={}]", storeId, e.getMessage()));

        return emitter;
    }

    public SseSession getEmitter(Long storeId) {
        return emitters.get(storeId);
    }

    public void removeClient(Long storeId) {
        SseSession session = emitters.get(storeId); // Map에서 제거하지 않고 가져오기

        if (session != null) {
            try {
                session.emitter().complete(); // emitter만 종료
            } catch (Exception e) {
                log.warn(
                        "[removeClient][Failed to complete SseEmitter for storeId={}]", storeId, e);
            }
        }
    }

    public void subscribe(Long storeId, SubscriptionTopicsRequest SubscriptionTopicsRequest) {

        if (!emitters.containsKey(storeId)) {
            log.warn("[subscribe][SSE 연결 없이 구독 시도][storeId= {}]", storeId);
            throw new BadRequestException(SUBSCRIBE_WITHOUT_SSE);
        }

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
