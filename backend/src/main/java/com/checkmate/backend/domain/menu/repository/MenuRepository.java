package com.checkmate.backend.domain.menu.repository;

import com.checkmate.backend.domain.menu.entity.Menu;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    /*
     * read
     * */

    @Query("select menu from Menu menu" + " where menu.store.id=:storeId")
    List<Menu> findAllByStoreId(@Param("storeId") Long storeId);
}
