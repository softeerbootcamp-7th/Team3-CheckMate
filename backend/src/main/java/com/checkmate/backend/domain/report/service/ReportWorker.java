package com.checkmate.backend.domain.report.service;

import com.checkmate.backend.domain.report.dto.ReportData;
import com.checkmate.backend.domain.report.dto.ReportTask;
import com.checkmate.backend.domain.report.entity.Report;
import com.checkmate.backend.domain.report.enums.ReportType;
import com.checkmate.backend.domain.report.repository.ReportRepository;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.client.llm.LlmClient;
import com.checkmate.backend.global.client.llm.PromptProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReportWorker {

    private final ReportQueryService reportQueryService;
    private final LlmClient llmClient;
    private final ReportRepository reportRepository;
    private final StoreRepository storeRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final PromptProvider promptProvider;
    private final NotificationService notificationService;

    private static final String PENDING_KEY = "report:queue:pending";
    private static final String PROCESSING_KEY = "report:queue:processing";

    // TODO : 얼마나 자주 실행할지 고민 필요
    @Scheduled(fixedDelay = 5000) // 5초마다 실행
    public void processTask() {
        Object rawTask =
                redisTemplate.opsForList().rightPopAndLeftPush(PENDING_KEY, PROCESSING_KEY);

        if (rawTask == null) return;

        ReportTask task = objectMapper.convertValue(rawTask, ReportTask.class);

        try {
            log.info("리포트 생성 시작: 매장 {}, 날짜 {}", task.storeId(), task.targetDate());

            ReportData data = reportQueryService.generateReport(task);

            String template =
                    task.reportType() == ReportType.DAILY
                            ? promptProvider.getPrompt(PromptProvider.PromptType.DAILY_REPORT)
                            : promptProvider.getPrompt(PromptProvider.PromptType.MONTHLY_REPORT);
            String llmResponse = llmClient.ask(template, buildPrompt(data));

            saveReportResult(task, data, llmResponse);

            redisTemplate.opsForList().remove(PROCESSING_KEY, 1, rawTask);
            log.info("리포트 생성 완료: 매장 {}", task.storeId());
        } catch (Exception e) {
            log.error("리포트 생성 실패: 매장 {}", task.storeId(), e);
            handleFailure(rawTask, task);
        }
    }

    private String buildPrompt(ReportData data) {
        try {
            return "\n<data>\n" + objectMapper.writeValueAsString(data) + "\n</data>";
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON 변환 실패", e);
        }
    }

    private void saveReportResult(ReportTask task, ReportData data, String llmResponse)
            throws JsonProcessingException {
        // LLM 응답 파싱
        JsonNode root = objectMapper.readTree(llmResponse);
        JsonNode kpi = root.path("kpi");

        Store store =
                storeRepository
                        .findById(task.storeId())
                        .orElseThrow(() -> new RuntimeException("Store not found"));

        // 1. Strategies 처리 (LLM: ["전략1", "전략2"] -> Entity: List<String>)
        // 구조가 같으므로 바로 변환 가능
        List<String> strategies =
                objectMapper.convertValue(
                        root.path("strategies"), new TypeReference<List<String>>() {});

        // 2. Insights 처리 (LLM: [{observe:..., meaning:...}] -> Entity: List<String>)
        // 구조가 다르므로(객체 vs 문자열), 객체의 필드를 조합해 하나의 문자열로 만듭니다.
        List<String> insights = new ArrayList<>();
        JsonNode insightsNode = root.path("insights");
        if (insightsNode.isArray()) {
            for (JsonNode node : insightsNode) {
                // 예: "매출 감소 (의미: 주문 수 부족, 영향: 목표 미달 예상)" 형태로 포맷팅
                String formattedInsight =
                        String.format(
                                "%s (의미: %s / 영향: %s)",
                                node.path("observe").asText(),
                                node.path("meaning").asText(),
                                node.path("impact").asText());
                insights.add(formattedInsight);
            }
        }

        Report report =
                Report.builder()
                        .store(store)
                        .targetDate(task.targetDate())
                        .title(root.path("title").asText())
                        .statusLabel(root.path("statusLabel").asText())
                        .netSales(data.kpiToday().netSales())
                        .netSalesSummary(kpi.path("netSales").asText())
                        .orderCount(data.kpiToday().orders())
                        .ordersSummary(kpi.path("orders").asText())
                        .aov(data.kpiToday().aov())
                        .aovSummary(kpi.path("aov").asText())
                        .insights(insights) // 변환된 리스트 주입
                        .strategies(strategies) // 리스트 주입
                        .build();

        reportRepository.save(report);

        notificationService.createNotification(store, report.getTitle());
    }

    private void handleFailure(Object rawTask, ReportTask task) {
        redisTemplate.opsForList().remove(PROCESSING_KEY, 1, rawTask);

        if (task != null && task.retryCount() < 3) {
            ReportTask retryTask = task.incrementRetry();
            redisTemplate.opsForList().leftPush(PENDING_KEY, retryTask);
        } else {
            log.error("최종 실패 처리: 매장 {}", task != null ? task.storeId() : "Unknown");
            redisTemplate.opsForList().leftPush("report:queue:fail", rawTask);
        }
    }
}
