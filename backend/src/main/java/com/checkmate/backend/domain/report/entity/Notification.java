package com.checkmate.backend.domain.report.entity;

import static jakarta.persistence.GenerationType.IDENTITY;

import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
        name = "notification",
        indexes = {
            @Index(
                    name = "idx_notification_store_created",
                    columnList = "store_id, created_at DESC")
        })
public class Notification extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "store_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Store store;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "is_read", nullable = false)
    private boolean isRead;

    @Builder
    public Notification(Store store, String content) {
        this.store = store;
        this.content = content;
        this.isRead = false; // 기본값은 미열람
    }

    /** 알림 읽음 처리 메서드 */
    public void markAsRead() {
        this.isRead = true;
    }
}
