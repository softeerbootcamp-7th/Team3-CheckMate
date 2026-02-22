package com.checkmate.backend.domain.report.repository;

import com.checkmate.backend.domain.report.dto.ReportTask;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ReportTaskRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    private static final String PENDING_KEY = "report:queue:pending";
    private static final String PROCESSING_KEY = "report:queue:processing";
    private static final String FAIL_KEY = "report:queue:fail";

    /** 작업을 대기 큐에 추가 */
    public void push(ReportTask task) {
        redisTemplate.opsForList().leftPush(PENDING_KEY, task);
    }

    /** 대기 큐에서 꺼내어 처리 중 큐로 이동 (Atomic) */
    public ReportTask popAndStart() {
        Object raw = redisTemplate.opsForList().rightPopAndLeftPush(PENDING_KEY, PROCESSING_KEY);
        return raw != null ? objectMapper.convertValue(raw, ReportTask.class) : null;
    }

    /** 처리 완료 후 처리 중 큐에서 제거 */
    public void remove(ReportTask task) {
        redisTemplate.opsForList().remove(PROCESSING_KEY, 1, task);
    }

    /** 실패 시 재시도 또는 실패 큐로 이동 */
    public void handleFailure(ReportTask task) {
        redisTemplate.opsForList().remove(PROCESSING_KEY, 1, task);

        if (task.retryCount() < 3) {
            ReportTask retryTask = task.incrementRetry();
            redisTemplate.opsForList().leftPush(PENDING_KEY, retryTask);
        } else {
            redisTemplate.opsForList().leftPush(FAIL_KEY, task);
        }
    }
}
