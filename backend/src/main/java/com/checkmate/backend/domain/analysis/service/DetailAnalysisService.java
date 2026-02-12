package com.checkmate.backend.domain.analysis.service;

import static com.checkmate.backend.global.response.ErrorStatus.UNSUPPORTED_ANALYSIS_CARD;

import com.checkmate.backend.domain.analysis.context.AnalysisContext;
import com.checkmate.backend.domain.analysis.dto.request.DetailAnalysisRequest;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.factory.AnalysisContextFactory;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.OrderCreatedEvent;
import com.checkmate.backend.global.exception.BadRequestException;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DetailAnalysisService {
    private final List<AnalysisProcessor<?>> processors;
    private final List<AnalysisContextFactory> contextFactories;

    /*
     * read
     * */
    public DetailAnalysisResponse getDetailAnalysis(
            Long storeId, DetailAnalysisRequest detailAnalysisRequest) {

        AnalysisCardCode analysisCardCode = detailAnalysisRequest.analysisCardCode();

        // 1. Context 생성
        AnalysisContextFactory contextFactory =
                contextFactories.stream()
                        .filter(f -> f.supports(analysisCardCode))
                        .findFirst()
                        .orElseThrow(
                                () -> {
                                    log.warn(
                                            "[getDetailAnalysis][No AnalysisContextFactory found.][analysisCardCode={}]",
                                            analysisCardCode);
                                    return new BadRequestException(UNSUPPORTED_ANALYSIS_CARD);
                                });

        AnalysisContext context =
                contextFactory.create(analysisCardCode, new OrderCreatedEvent(storeId));

        if (context == null) {
            log.warn("[getDetailAnalysis][context is null][analysisCardCode={}]", analysisCardCode);
            throw new BadRequestException(UNSUPPORTED_ANALYSIS_CARD);
        }

        // 2. 커스텀 기간 적용
        if (detailAnalysisRequest.customPeriod()) {
            LocalDate from =
                    detailAnalysisRequest.from() != null
                            ? detailAnalysisRequest.from()
                            : context.getStartDate();
            LocalDate to =
                    detailAnalysisRequest.to() != null
                            ? detailAnalysisRequest.to().plusDays(1)
                            : context.getEndDate();

            // 커스텀 기간으로 새로운 Context 생성
            context = contextFactory.create(analysisCardCode, storeId, from, to);
        }

        // 3. Processor 찾기
        AnalysisProcessor<? extends AnalysisContext> processor =
                processors.stream()
                        .filter(p -> p.supports(analysisCardCode))
                        .findFirst()
                        .orElseThrow(
                                () -> {
                                    log.warn(
                                            "[getDetailAnalysis][No AnalysisProcessor found][analysisCardCode={}]",
                                            analysisCardCode);
                                    return new BadRequestException(UNSUPPORTED_ANALYSIS_CARD);
                                });

        // 4. Processor 실행 및 AnalysisResponse 수신
        AnalysisResponse response = processSafely(processor, context);

        if (response == null) {
            log.warn(
                    "[getDetailAnalysis][Processor returned null][analysisCardCode={}]",
                    analysisCardCode);
            throw new BadRequestException(UNSUPPORTED_ANALYSIS_CARD);
        }

        DetailAnalysisResponse detailAnalysisResponse = response.detailAnalysisResponse();

        return detailAnalysisResponse;
    }

    @SuppressWarnings("unchecked")
    private <T extends AnalysisContext> AnalysisResponse processSafely(
            AnalysisProcessor<T> processor, AnalysisContext context) {
        return processor.process((T) context);
    }
}
