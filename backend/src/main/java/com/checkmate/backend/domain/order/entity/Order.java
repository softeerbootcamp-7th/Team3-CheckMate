package com.checkmate.backend.domain.order.entity;

import static jakarta.persistence.ConstraintMode.NO_CONSTRAINT;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "orders",
        indexes = {
            @Index(name = "idx_order_store_id", columnList = "store_id"),
            @Index(name = "idx_order_store_id_order_date", columnList = "store_id, order_date")
        })
public class Order extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "order_id")
    private Long id;

    private Integer grossAmount;
    private Integer discountAmount;
    private Integer netAmount;
    private String salesType; // 홀, 포장, 배달, 판매 유형
    private String orderChannel; // POS, 키오스크, 배달앱
    private String orderStatus; // 완료 / 취소
    private String paymentMethod; // 카드, 현금, 간편결제, 기타
    private LocalDateTime orderedAt;
    private LocalDate orderDate;
    private Integer timeSlot2H; // orderedAt을 2시간 단위로 자름

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "store_id", foreignKey = @ForeignKey(NO_CONSTRAINT))
    private Store store;
}
