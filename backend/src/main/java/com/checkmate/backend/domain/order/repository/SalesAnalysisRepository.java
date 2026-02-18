package com.checkmate.backend.domain.order.repository;

import com.checkmate.backend.domain.analysis.dto.projection.sales.*;
import com.checkmate.backend.domain.order.entity.Order;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SalesAnalysisRepository extends JpaRepository<Order, Long> {

    /** SLS_01 (실매출) */
    @Query(
            "select sum(o.netAmount) from Order o"
                    + " where o.store.id=:storeId"
                    + " and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " and o.orderStatus='COMPLETE'")
    Long findTotalNetAmount(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_02 (주문건수) */
    @Query(
            "select count(o) from Order o"
                    + " where o.store.id=:storeId"
                    + " and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " and o.orderStatus='COMPLETE'")
    Long countOrders(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_03 (건당 평균가) */
    @Query(
            "select case when count(o) = 0 then 0L"
                    + " else (sum(o.netAmount)  / count(o)) end"
                    + " from Order o"
                    + " where o.store.id = :storeId"
                    + " and o.orderDate >= :startDate"
                    + " and o.orderDate < :endDate"
                    + " and o.orderStatus='COMPLETE'")
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

    /** SLS_05 (할인 & 취소) */
    // 할인 금액
    @Query(
            "select sum(o.discountAmount)"
                    + " from Order o"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate ")
    Long findDiscountAmount(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    // 취소 금액
    @Query(
            "select sum(o.netAmount)"
                    + " from Order o"
                    + " where o.store.id=:storeId"
                    + " and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " and o.orderStatus = 'CANCEL'")
    Long findCanceledAmount(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_06 (판매유형별 매출) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByTypeProjection (o.salesType, sum(o.netAmount), count(o)) "
                    + " from Order o"
                    + " where o.store.id=:storeId"
                    + " and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " and o.orderStatus='COMPLETE'"
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
                    + " where o.store.id=:storeId"
                    + " and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " and o.orderStatus='COMPLETE'"
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
                    + " where o.store.id=:storeId"
                    + " and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " and o.orderStatus='COMPLETE'"
                    + " group by o.paymentMethod"
                    + " order by sum(o.netAmount) desc")
    List<SalesByPayMethodProjection> findSalesByPaymentMethod(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_09 (일별 매출 추이) SLS_10 (주별 매출 추이) SLS_11 (월별 매출 추이) SLS_12 (연별 매출 추이) */
    @Query(
            value =
                    """
                SELECT
                    CAST(date_trunc(:unit, o.order_date) AS DATE) AS bucketDate,
                    COUNT(*) AS orderCount,
                    COALESCE(SUM(o.net_amount),0) AS netAmount
                FROM orders o
                WHERE o.store_id = :storeId
                AND o.order_status = 'COMPLETE'
                AND o.order_date >= :startDate
                AND o.order_date < :endDate
                GROUP BY bucketDate
                ORDER BY bucketDate
                """,
            nativeQuery = true)
    List<SalesTrendProjection> findSalesTrend(
            @Param("storeId") Long storeId,
            @Param("unit") String unit,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** SLS_13_01 (피크타임) */

    // 오늘
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.sales.TodayPeakTimeProjection(o.timeSlot2H, sum(o.netAmount), count(o)) "
                    + " from Order o"
                    + " where o.store.id=:storeId"
                    + " and o.orderDate=:today"
                    + " and o.orderStatus='COMPLETE'"
                    + " group by o.timeSlot2H"
                    + " order by o.timeSlot2H asc ")
    List<TodayPeakTimeProjection> findTodayPeakTime(
            @Param("storeId") Long storeId, @Param("today") LocalDate today);

    // 비교기간 계산 쿼리
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.sales.PeakTimeAvgProjection(o.timeSlot2H, sum(o.netAmount), count(o), count(distinct (function('date_trunc','week',o.orderDate)))) "
                    + " from Order o"
                    + " where o.store.id=:storeId"
                    + " and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " and o.orderStatus='COMPLETE'"
                    + " and o.orderDayOfWeek=:orderDayOfWeek"
                    + " group by o.timeSlot2H"
                    + " order by o.timeSlot2H asc ")
    List<PeakTimeAvgProjection> findPeakTimeAvg(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("orderDayOfWeek") Integer orderDayOfWeek);

    /** SLS_13 (피크타임) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.sales.SalesByDayProjection(o.orderDayOfWeek, avg(o.netAmount), count(o)) "
                    + " from Order o"
                    + " where o.store.id=:storeId"
                    + " and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " and o.orderStatus='COMPLETE'"
                    + " group by o.orderDayOfWeek"
                    + " order by o.orderDayOfWeek asc")
    List<SalesByDayProjection> findSalesByDay(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
