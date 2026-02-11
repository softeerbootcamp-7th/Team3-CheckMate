package com.checkmate.backend.domain.menu.entity;

import static jakarta.persistence.ConstraintMode.NO_CONSTRAINT;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.checkmate.backend.domain.store.entity.Store;
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
        indexes = @Index(name = "idx_ingredient_store_id", columnList = "store_id"),
        uniqueConstraints = {@UniqueConstraint(columnNames = {"store_id", "name"})})
public class Ingredient extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "ingredient_id")
    private Long id;

    private String name;
    private String baseUnit;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "store_id", foreignKey = @ForeignKey(NO_CONSTRAINT))
    private Store store;
}
