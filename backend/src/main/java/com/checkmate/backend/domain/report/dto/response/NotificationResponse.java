package com.checkmate.backend.domain.report.dto.response;

import com.checkmate.backend.domain.report.entity.Notification;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "알림 리스트 항목 응답 DTO")
public record NotificationResponse(
        @Schema(description = "알림 ID", example = "1") Long notificationId,
        @Schema(description = "알림 본문", example = "2월 18일 하루 리포트가 발행되었습니다.") String content,
        @Schema(description = "읽음 여부 (true: 읽음)", example = "true") boolean isRead,
        @Schema(description = "알림 발생 시간 (ISO 8601)", example = "2026-02-18T17:30:00")
                LocalDateTime createdAt) {

    public static NotificationResponse from(Notification notification) {
        return new NotificationResponse(
                notification.getId(),
                notification.getContent(),
                notification.isRead(),
                notification.getCreatedAt());
    }
}
