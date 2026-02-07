package com.checkmate.backend.domain.menu.repository;

import com.checkmate.backend.domain.analysis.dto.projection.MenuIdNameProjection;
import com.checkmate.backend.domain.menu.entity.Menu;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    /*
     * read
     * */

    @Query("select menu from Menu menu" + " where menu.store.id=:storeId")
    List<Menu> findAllByStoreId(@Param("storeId") Long storeId);

    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.MenuIdNameProjection(m.id, m.name) from Menu m"
                    + " where m.id in :menusIds")
    List<MenuIdNameProjection> findMenuIdAndNameByIds(@Param("menusIds") Set<Long> menusIds);
}
