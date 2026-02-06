package com.checkmate.backend.domain.store.repository;

import com.checkmate.backend.domain.store.entity.Store;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StoreRepository extends JpaRepository<Store, Long> {
    /*
     * read
     * */

    @Query("select store from Store store" + " where store.member.id=:memberId")
    Optional<Store> findStoreByMemberId(@Param("memberId") Long memberId);
}
