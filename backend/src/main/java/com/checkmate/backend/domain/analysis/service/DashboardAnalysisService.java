package com.checkmate.backend.domain.analysis.service;

import static com.checkmate.backend.global.response.ErrorStatus.UNSUPPORTED_ANALYSIS_CARD;

import com.checkmate.backend.domain.analysis.context.AnalysisContext;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisDataResponse;
import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.factory.AnalysisContextFactory;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.OrderCreatedEvent;
import com.checkmate.backend.global.exception.BadRequestException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardAnalysisService {
    private final List<AnalysisProcessor<?>> processors;
    private final List<AnalysisContextFactory> contextFactories;

    /*
     * read
     * */
    public DashboardAnalysisDataResponse getDashboardAnalysisData(
            Long storeId, List<AnalysisCardCode> analysisCardCodes) {

        List<DashboardAnalysisDataResponse.DashboardAnalysisItem> items = new ArrayList<>();

        LocalDateTime anchor = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        for (AnalysisCardCode analysisCardCode : analysisCardCodes) {
            // 1. Context 생성
            AnalysisContextFactory contextFactory =
                    contextFactories.stream()
                            .filter(f -> f.supports(analysisCardCode))
                            .findFirst()
                            .orElseThrow(
                                    () -> {
                                        log.warn(
                                                "[getDashboardAnalysisData][No AnalysisContextFactory found.][analysisCardCode={}]",
                                                analysisCardCode);
                                        return new BadRequestException(UNSUPPORTED_ANALYSIS_CARD);
                                    });

            AnalysisContext context =
                    contextFactory.create(analysisCardCode, new OrderCreatedEvent(storeId, anchor));

            if (context == null) {
                log.warn(
                        "[getDashboardAnalysisData][context is null][analysisCardCode={}]",
                        analysisCardCode);
                throw new BadRequestException(UNSUPPORTED_ANALYSIS_CARD);
            }

            // 3. Processor 찾기
            AnalysisProcessor<? extends AnalysisContext> processor =
                    processors.stream()
                            .filter(p -> p.supports(analysisCardCode))
                            .findFirst()
                            .orElseThrow(
                                    () -> {
                                        log.warn(
                                                "[getDashboardAnalysisData][No AnalysisProcessor found][analysisCardCode={}]",
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

            DashboardAnalysisResponse dashboardAnalysisResponse =
                    response.dashboardAnalysisResponse();

            items.add(
                    new DashboardAnalysisDataResponse.DashboardAnalysisItem(
                            analysisCardCode, dashboardAnalysisResponse));
        }

        DashboardAnalysisDataResponse response = new DashboardAnalysisDataResponse(items);

        return response;
    }

    @SuppressWarnings("unchecked")
    private <T extends AnalysisContext> AnalysisResponse processSafely(
            AnalysisProcessor<T> processor, AnalysisContext context) {
        return processor.process((T) context);
    }
}
