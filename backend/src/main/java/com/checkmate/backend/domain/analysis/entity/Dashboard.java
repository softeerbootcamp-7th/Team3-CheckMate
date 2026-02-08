package com.checkmate.backend.domain.analysis.entity;

import com.checkmate.backend.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dashboard")
public class Dashboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 6)
    private String name;

    @Column(nullable = false)
    private Boolean isDefault;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "store_id",
            nullable = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Store store;

    @Builder
    public Dashboard(String name, Boolean isDefault, Store store) {
        this.name = name;
        this.isDefault = isDefault != null ? isDefault : false;
        this.store = store;
    }

    public void updateName(String newName) {
        this.name = newName;
    }
}
