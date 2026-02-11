package com.checkmate.backend.domain.store.repository;

import com.checkmate.backend.domain.store.entity.BusinessHour;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BusinessHourRepository extends JpaRepository<BusinessHour, Long> {

    /*
     * read
     * */

    @Query("select bh from BusinessHour bh" + " where bh.store.id =:storeId")
    List<BusinessHour> findBusinessHoursByStoreId(@Param("storeId") Long storeId);
}
