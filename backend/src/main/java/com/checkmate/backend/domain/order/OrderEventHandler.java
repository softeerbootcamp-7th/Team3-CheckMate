package com.checkmate.backend.domain.order;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.presenter.DashboardAnalysisPresenter;
import com.checkmate.backend.global.sse.SseEmitterManager;
import com.checkmate.backend.global.sse.SseEventSender;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventHandler {
    private final SseEmitterManager sseEmitterManager;
    private final List<DashboardAnalysisPresenter> presenters;
    private final SseEventSender sseEventSender;

    // TODO 스레드 풀 따로 정의해볼 것
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(OrderCreatedEvent event) {

        Set<AnalysisCardCode> topics = sseEmitterManager.getSubscribedTopics(event.storeId());

        for (AnalysisCardCode topic : topics) {
            presenters.stream()
                    .filter(p -> p.supports(topic))
                    .map(p -> p.present(topic))
                    .filter(Objects::nonNull)
                    .findFirst()
                    .ifPresent(response -> sseEventSender.send(event.storeId(), topic, response));
        }
    }
}
