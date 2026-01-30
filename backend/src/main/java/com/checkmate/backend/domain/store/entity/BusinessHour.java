package com.checkmate.backend.domain.store.entity;

import static jakarta.persistence.ConstraintMode.NO_CONSTRAINT;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

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
@Table(indexes = @Index(name = "idx_store_id", columnList = "store_id"))
public class BusinessHour extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "business_hour_id")
    private Long id;

    private String day;
    private String openTime;
    private String closeTime;

    private boolean closed;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "store_id", foreignKey = @ForeignKey(NO_CONSTRAINT))
    private Store store;
}
