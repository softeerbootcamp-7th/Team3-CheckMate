package com.checkmate.backend.domain.order.entity;

import static jakarta.persistence.ConstraintMode.NO_CONSTRAINT;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.checkmate.backend.domain.menu.entity.MenuVersion;
import com.checkmate.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
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
        name = "order_menu",
        indexes = {
            @Index(name = "idx_order_menu_store_id", columnList = "order_Id"),
            @Index(name = "idx_order_menu_menu_version_id", columnList = "menu_version_id")
        })
public class OrderMenu extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "order_menu_id")
    private Long id;

    private Integer unitPrice; // 단가
    private Integer quantity; // 수량
    private Integer lineGrossAmount; // 단가 x 수량

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "order_id", foreignKey = @ForeignKey(NO_CONSTRAINT))
    private Order order;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "menu_version_id", foreignKey = @ForeignKey(NO_CONSTRAINT))
    private MenuVersion menuVersion;
}
