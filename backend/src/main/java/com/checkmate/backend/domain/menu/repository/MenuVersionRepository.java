package com.checkmate.backend.domain.menu.repository;

import com.checkmate.backend.domain.menu.entity.MenuVersion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuVersionRepository extends JpaRepository<MenuVersion, Long> {

    @Query(
            "select mv from MenuVersion mv"
                    + " join fetch mv.menu"
                    + " where mv.menu.id in :menuIds and mv.active=true"
                    + " order by mv.menu.name asc")
    List<MenuVersion> findMenuVersionsByMenuIdsWithMenu(@Param("menuIds") List<Long> menuIds);

    @Query("select mv from MenuVersion mv" + " where mv.id in :menuVersionIds")
    List<MenuVersion> findMenuVersionsByMenuVersionIds(
            @Param("menuVersionIds") List<Long> menuVersionIds);

    @Query(
            "select mv from MenuVersion mv"
                    + " join fetch mv.menu m"
                    + " where mv.active=true and m.store.id=:storeId and m.id in :menuIds")
    List<MenuVersion> findActiveMenuVersionsByStoreIdAndMenuIds(
            @Param("storeId") Long storeId, @Param("menuIds") List<Long> menuIds);

    @Query(
            "select mv from MenuVersion mv"
                    + " join fetch mv.menu m"
                    + " join fetch m.store"
                    + " where m.id=:menuId and mv.active=true")
    Optional<MenuVersion> findMenuVersionByMenuIdWithMenuAndStore(@Param("menuId") Long menuId);

    @Query("select mv from MenuVersion mv" + " where mv.menu.id=:menuId and mv.active=true")
    Optional<MenuVersion> findActiveMenuVersionByMenuId(@Param("menuId") Long menuId);
}
