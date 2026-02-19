package com.checkmate.backend.domain.report.repository;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NotificationRedisRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String KEY_PREFIX = "notification:unread:";

    public void saveUnreadStatus(Long storeId) {
        // 알림 보관 정책에 맞춰 7일 후 자동 삭제 (TTL 설정)
        redisTemplate.opsForValue().set(getRedisKey(storeId), "true", 7, TimeUnit.DAYS);
    }

    public boolean hasUnreadStatus(Long storeId) {
        Object value = redisTemplate.opsForValue().get(getRedisKey(storeId));
        return value != null && value.toString().equals("true");
    }

    public void deleteUnreadStatus(Long storeId) {
        redisTemplate.delete(getRedisKey(storeId));
    }

    private String getRedisKey(Long storeId) {
        return KEY_PREFIX + storeId;
    }
}
