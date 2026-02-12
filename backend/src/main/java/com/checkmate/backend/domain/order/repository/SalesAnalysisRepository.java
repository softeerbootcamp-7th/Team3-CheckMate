package com.checkmate.backend.domain.order.repository;

import com.checkmate.backend.domain.analysis.dto.projection.sales.*;
import com.checkmate.backend.domain.order.entity.Order;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
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

    /** SLS_04 (총매출) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.sales.GrossAmountProjection(sum(o.grossAmount), count(o))"
                    + " from Order o"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate")
    GrossAmountProjection findGrossAmount(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_06 (판매유형별 매출) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByTypeProjection (o.salesType, sum(o.netAmount), count(o)) "
                    + " from Order o"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " group by o.salesType"
                    + " order by sum(o.netAmount) desc")
    List<SalesByTypeProjection> findSalesBySalesType(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_07 (주문수단별 매출) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByOrderChannelProjection(o.orderChannel, sum(o.netAmount), count(o)) "
                    + " from Order o"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " group by o.orderChannel"
                    + " order by sum(o.netAmount) desc")
    List<SalesByOrderChannelProjection> findSalesByOrderChannel(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_08 (결제수단별 매출) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByPayMethodProjection(o.paymentMethod, sum(o.netAmount), count(o)) "
                    + " from Order o"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " group by o.paymentMethod"
                    + " order by sum(o.netAmount) desc")
    List<SalesByPayMethodProjection> findSalesByPaymentMethod(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_09_04 (일별 매출 추이) SLS_10_07 (주별 매출 추이) SLS_11_07 (월별 매출 추이) SLS_12_01 (연별 매출 추이) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.sales.SalesTrendProjection(sum(o.netAmount), count(o)) "
                    + " from Order o"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate")
    Optional<SalesTrendProjection> findSalesTrend(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
