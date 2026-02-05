package com.checkmate.backend.domain.order;

import com.checkmate.backend.domain.analysis.AnalysisContext;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.factory.AnalysisContextFactory;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.global.sse.SseEmitterManager;
import java.util.List;
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
    private final List<AnalysisProcessor<?>> processors;
    private final List<AnalysisContextFactory> contextFactories;

    // TODO 스레드 풀 따로 정의해볼 것
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(OrderCreatedEvent event) {

        Set<AnalysisCardCode> topics = sseEmitterManager.getSubscribedTopics(event.storeId());

        for (AnalysisCardCode topic : topics) {

            // 1. Context 생성
            AnalysisContext context =
                    contextFactories.stream()
                            .filter(f -> f.supports(topic))
                            .findFirst()
                            .map(f -> f.create(topic, event))
                            .orElse(null);

            if (context == null) {
                log.error("[handle][No AnalysisContextFactory found.][topic={}]", topic);
                continue;
            }

            // 2. Processor 실행
            processors.stream()
                    .filter(p -> p.supports(topic))
                    .forEach(p -> processSafely(p, context));
        }
    }

    @SuppressWarnings("unchecked")
    private <T extends AnalysisContext> void processSafely(
            AnalysisProcessor<T> processor, AnalysisContext context) {
        processor.process((T) context);
    }
}
