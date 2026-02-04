package com.checkmate.backend.domain.store.repository;

import com.checkmate.backend.domain.store.entity.Pos;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PosTestRepository extends JpaRepository<Pos, Long> {

    @Modifying
    @Transactional
    @Query("delete from Pos p" + " where p.store.id=:storeId")
    void deletePosByStoreId(@Param("storeId") Long store);
}
