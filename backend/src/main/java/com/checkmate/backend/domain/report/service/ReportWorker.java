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
        JsonNode root = objectMapper.readTree(llmResponse);
        JsonNode kpi = root.path("kpi");
        JsonNode titleNode = root.path("title");

        Store store =
                storeRepository
                        .findById(task.storeId())
                        .orElseThrow(() -> new RuntimeException("Store not found"));

        // 1. Strategies 처리 (LLM: ["전략1", "전략2"] -> Entity: List<String>)
        List<String> strategies =
                objectMapper.convertValue(root.path("strategies"), new TypeReference<>() {});

        // 2. Insights 처리 (LLM: [{idx, observe, meaning, impact}] -> Entity: List<InsightItem>)
        List<Report.InsightItem> insights = new ArrayList<>();
        JsonNode insightsNode = root.path("insights");
        if (insightsNode.isArray()) {
            for (JsonNode node : insightsNode) {
                insights.add(
                        new Report.InsightItem(
                                node.path("idx").asInt(),
                                node.path("observe").asText(),
                                node.path("meaning").asText(),
                                node.path("impact").asText()));
            }
        }

        // 3. KPI 항목 파싱 (LLM: {label, value, diffVal, diffDesc, trendDir} -> Entity: KpiItem)
        Report.KpiItem netSalesKpi = toKpiItem(kpi.path("netSales"));
        Report.KpiItem ordersKpi = toKpiItem(kpi.path("orders"));
        Report.KpiItem aovKpi = toKpiItem(kpi.path("aov"));

        Report report =
                Report.builder()
                        .store(store)
                        .targetDate(task.targetDate())
                        .titleFullText(titleNode.path("fullText").asText())
                        .titleHighlight(titleNode.path("highlight").asText())
                        .statusLabel(root.path("statusLabel").asText())
                        .netSales(data.kpiToday().netSales())
                        .netSalesKpi(netSalesKpi)
                        .orderCount(data.kpiToday().orders())
                        .ordersKpi(ordersKpi)
                        .aov(data.kpiToday().aov())
                        .aovKpi(aovKpi)
                        .insights(insights)
                        .strategies(strategies)
                        .build();

        reportRepository.save(report);

        notificationService.createNotification(store, report.getTitleFullText());
    }

    private Report.KpiItem toKpiItem(JsonNode node) {
        return new Report.KpiItem(
                node.path("label").asText(),
                node.path("value").asText(),
                node.path("diffVal").asText(),
                node.path("diffDesc").asText(),
                node.path("trendDir").asText());
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
