package com.checkmate.backend.domain.order.repository;

import com.checkmate.backend.domain.order.entity.Order;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SalesAnalysisRepository extends JpaRepository<Order, Long> {

    /** SLS_01 (실매출) */
    @Query(
            "select sum(o.netAmount) from Order o"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate")
    Long findTotalNetAmount(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_02 (주문건수) */
    @Query(
            "select count(o) from Order o"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate")
    Long countOrders(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_03 (건당 평균가) */
    @Query(
            "select case when count(o) = 0 then 0.0 "
                    + "else (sum(o.netAmount)  / count(o)) end "
                    + "from Order o "
                    + "where o.store.id = :storeId "
                    + "and o.orderDate >= :startDate "
                    + "and o.orderDate < :endDate")
    Long findAverageOrderAmount(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
