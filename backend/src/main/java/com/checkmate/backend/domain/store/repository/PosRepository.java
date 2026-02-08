package com.checkmate.backend.domain.store.repository;

import com.checkmate.backend.domain.store.entity.Pos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PosRepository extends JpaRepository<Pos, Long> {
    boolean existsByStoreId(Long storeId);
}
