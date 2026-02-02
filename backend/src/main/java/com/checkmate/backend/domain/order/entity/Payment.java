package com.checkmate.backend.domain.order.entity;

import static jakarta.persistence.ConstraintMode.NO_CONSTRAINT;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.checkmate.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
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
        name = "payment",
        indexes = {@Index(name = "idx_payment_order_id", columnList = "order_Id")})
public class Payment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "payment_id")
    private Long id;

    private String paymentMethod; // 결제 수단. (카드, 현금, 간편결제, 기타)
    private Integer paidAmount; // 실제 결제된 금액
    private Integer refundAmount; // 환불 금액
    private String paymentStatus; // paid, partial_refund, full_refund
    private LocalDateTime paidAt; // 선 주문 후 결제

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "order_id", foreignKey = @ForeignKey(NO_CONSTRAINT))
    private Order order;
}
