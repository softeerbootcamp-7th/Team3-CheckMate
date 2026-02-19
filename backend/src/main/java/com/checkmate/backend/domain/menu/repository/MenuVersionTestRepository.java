package com.checkmate.backend.domain.menu.repository;

import com.checkmate.backend.domain.menu.entity.MenuVersion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuVersionTestRepository extends JpaRepository<MenuVersion, Long> {

    @Query(
            "select mv from MenuVersion mv"
                    + " join fetch mv.menu m"
                    + " where mv.active=true and m.store.id=:storeId")
    List<MenuVersion> findActiveMenuVersionsByStoreId(@Param("storeId") Long storeId);

    @Query(
            "select mv from MenuVersion mv"
                    + " join fetch mv.menu m"
                    + " where mv.active=true and m.id in :menuIds")
    List<MenuVersion> findActiveMenuVersionsByMenuIds(@Param("menuIds") List<Long> menuIds);
}
