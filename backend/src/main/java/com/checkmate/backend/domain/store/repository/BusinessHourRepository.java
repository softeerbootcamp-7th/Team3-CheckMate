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

    @Query(
            "SELECT bh FROM BusinessHour bh JOIN FETCH bh.store "
                    + "WHERE bh.closeTime = :currentTime "
                    + "AND bh.closed = false "
                    + "AND ("
                    + "    (bh.day = :today AND bh.closesNextDay = false) "
                    + "    OR "
                    + "    (bh.day = :yesterday AND bh.closesNextDay = true)"
                    + ")")
    List<BusinessHour> findNormalClosingStores(
            @Param("today") String today,
            @Param("yesterday") String yesterday,
            @Param("currentTime") String currentTime);

    @Query(
            "SELECT bh FROM BusinessHour bh JOIN FETCH bh.store s "
                    + "WHERE bh.closed = false "
                    + "AND bh.open24Hours = true "
                    + "AND bh.day = :today "
                    + "AND s.salesClosingHour = :currentHour")
    List<BusinessHour> find24HClosingStores(
            @Param("today") String today, @Param("currentHour") Integer currentHour);
}
