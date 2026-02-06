package com.checkmate.backend.domain.menu.entity;

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
@Table(
        indexes = {
            @Index(name = "idx_recipe_menu_version_id", columnList = "menu_version_id"),
            @Index(name = "idx_recipe_ingredient_id", columnList = "ingredient_id")
        })
public class Recipe extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "recipe_id")
    private Long id;

    private Integer quantity;
    private String unit;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "menu_version_id", foreignKey = @ForeignKey(NO_CONSTRAINT))
    private MenuVersion menuVersion;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "ingredient_id", foreignKey = @ForeignKey(NO_CONSTRAINT))
    private Ingredient ingredient;
}
