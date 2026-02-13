package com.checkmate.backend.domain.order.repository;

import com.checkmate.backend.domain.order.entity.Order;
import com.checkmate.backend.domain.report.dto.projection.KpiTodayProjection;
import com.checkmate.backend.domain.report.dto.projection.StatsDtoProjection;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportAnalysisRepository extends JpaRepository<Order, Long> {

    /** 1. 오늘의 KPI (SELECT new 제거 -> 인터페이스 매핑) */
    @Query(
            """
            SELECT
                COALESCE(SUM(o.netAmount), 0) as netSales,
                COUNT(o) as orders
            FROM Order o
            WHERE o.store.id = :storeId
              AND o.orderedAt >= :start AND o.orderedAt < :end
              AND o.orderStatus = 'COMPLETE'
            """)
    KpiTodayProjection findKpiToday(
            @Param("storeId") Long storeId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    /** 2. 특정 단일 기간 집계 (StatsDtoProjection 사용) */
    @Query(
            """
            SELECT
                COALESCE(SUM(o.netAmount), 0) as netSales,
                COUNT(o) as orders,
                0L as aov
            FROM Order o
            WHERE o.store.id = :storeId
              AND o.orderedAt >= :start AND o.orderedAt < :end
              AND o.orderStatus = 'COMPLETE'
            """)
    StatsDtoProjection findStats(
            @Param("storeId") Long storeId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    /** 3. 최근 4주간 '동일 요일' 집계 리스트 (기존 유지, Native Query) */
    @Query(
            value =
                    """
                    SELECT
                        COALESCE(SUM(o.net_amount), 0) as netSales,
                        COUNT(o.order_id) as orders,
                        0 as aov
                    FROM "Order" o
                    WHERE o.store_id = :storeId
                    AND o.order_status = 'COMPLETE'
                    AND (
                            (o.ordered_at >= :baseStart - INTERVAL '1 week' AND o.ordered_at < :baseEnd - INTERVAL '1 week') OR
                            (o.ordered_at >= :baseStart - INTERVAL '2 weeks' AND o.ordered_at < :baseEnd - INTERVAL '2 weeks') OR
                            (o.ordered_at >= :baseStart - INTERVAL '3 weeks' AND o.ordered_at < :baseEnd - INTERVAL '3 weeks') OR
                            (o.ordered_at >= :baseStart - INTERVAL '4 weeks' AND o.ordered_at < :baseEnd - INTERVAL '4 weeks')
                    )
                    GROUP BY CAST((o.ordered_at - CAST(CAST(:baseStart AS TIME) AS INTERVAL)) AS DATE)
                    """,
            nativeQuery = true)
    List<StatsDtoProjection> findLast4WeeksSameDayStatsNative(
            @Param("storeId") Long storeId,
            @Param("baseStart") LocalDateTime baseStart,
            @Param("baseEnd") LocalDateTime baseEnd);

    /** 4. 일별 집계 리스트 (JPQL에서 인터페이스 리스트로 반환) */
    @Query(
            """
            SELECT
                COALESCE(SUM(o.netAmount), 0) as netSales,
                COUNT(o) as orders,
                0L as aov
            FROM Order o
            WHERE o.store.id = :storeId
              AND o.orderedAt >= :start AND o.orderedAt < :end
              AND o.orderStatus = 'COMPLETE'
            GROUP BY o.orderDate
            ORDER BY o.orderDate ASC
            """)
    List<StatsDtoProjection> findDailyStats(
            @Param("storeId") Long storeId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);
}
