package com.checkmate.backend.domain.store.entity;

import static jakarta.persistence.ConstraintMode.NO_CONSTRAINT;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

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
@Table(indexes = @Index(name = "idx_pos_store_id", columnList = "store_id"))
public class Pos {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "pos_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "store_id", foreignKey = @ForeignKey(NO_CONSTRAINT))
    private Store store;
}
