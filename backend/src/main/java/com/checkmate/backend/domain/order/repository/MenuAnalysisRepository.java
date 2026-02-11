package com.checkmate.backend.domain.order.repository;

import com.checkmate.backend.domain.analysis.dto.projection.IngredientUsageProjection;
import com.checkmate.backend.domain.analysis.dto.projection.OrderMenusProjection;
import com.checkmate.backend.domain.analysis.dto.projection.TimeSlotMenuOrderCountProjection;
import com.checkmate.backend.domain.analysis.dto.response.menu.CategorySalesResponse;
import com.checkmate.backend.domain.analysis.dto.response.menu.MenuSalesResponse;
import com.checkmate.backend.domain.order.entity.Order;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuAnalysisRepository extends JpaRepository<Order, Long> {

    /** MUN_01 (메뉴별 매출 랭킹) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.response.menu.MenuSalesResponse(m.name, sum(oi.lineGrossAmount), count(*))"
                    + " from Order o"
                    + " join OrderItem oi on oi.order.id=o.id"
                    + " join oi.menuVersion mv"
                    + " join mv.menu m"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " group by m.id, m.name"
                    + " order by sum(oi.lineGrossAmount) desc")
    List<MenuSalesResponse> findMenuSales(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** MNU_02 (카테코리별 매출) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.response.menu.CategorySalesResponse(m.category, sum(oi.lineGrossAmount))"
                    + " from Order o"
                    + " join OrderItem oi on oi.order.id=o.id"
                    + " join oi.menuVersion mv"
                    + " join mv.menu m"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " group by m.category"
                    + " order by sum(oi.lineGrossAmount) desc")
    List<CategorySalesResponse> findCategorySales(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);

    /** MNU_03 (시간대별 메뉴 주문건수) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.TimeSlotMenuOrderCountProjection(o.timeSlot2H, m.name, count(*))"
                    + " from Order o"
                    + " join OrderItem oi on oi.order.id=o.id"
                    + " join oi.menuVersion mv"
                    + " join mv.menu m"
                    + " where o.store.id = :storeId"
                    + " and o.orderDate >= :startDate"
                    + " and o.orderDate < :endDate"
                    + " group by o.timeSlot2H, m.id, m.name"
                    + " order by o.timeSlot2H asc")
    List<TimeSlotMenuOrderCountProjection> findMenuCountPerTimeSlot(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** MNU_04 (식자재 소진량) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.projection.IngredientUsageProjection(ing.id, ing.name, sum(r.quantityNormalized * oi.quantity))"
                    + " from Order o"
                    + " join OrderItem oi on oi.order.id=o.id"
                    + " join oi.menuVersion mv"
                    + " join Recipe r on r.menuVersion.id=mv.id"
                    + " join r.ingredient ing"
                    + " where o.store.id=:storeId and o.orderDate>=:startDate and o.orderDate <:endDate"
                    + " group by ing.id, ing.name"
                    + " order by sum(r.quantityNormalized * oi.quantity) desc")
    List<IngredientUsageProjection> findIngredientUsage(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /** MNU_05(인기 메뉴 조합) */

    // 매출 기준 top3 조회
    @Query(
            "select m.id"
                    + " from Order o"
                    + " join OrderItem oi on oi.order.id=o.id"
                    + " join oi.menuVersion mv"
                    + " join mv.menu m"
                    + " where o.store.id=:storeId and o.orderDate >= :startDate and o.orderDate < :endDate"
                    + " group by m.id, m.name"
                    + " order by sum(oi.lineGrossAmount) desc"
                    + " limit 3")
    List<Long> findTop3MenuIds(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    // 주문에 포함된 메뉴 ID를 JSON 배열로 조회
    @Query(
            value =
                    "select o.order_id as orderid, json_agg(mv.menu_id) as menuids"
                            + " from orders o"
                            + " join order_item oi on oi.order_id = o.order_id"
                            + " join menu_version mv on mv.menu_version_id = oi.menu_version_id"
                            + " where o.store_id = :storeId and o.order_date >= :startDate and o.order_date < :endDate"
                            + " group by o.order_id",
            nativeQuery = true)
    List<OrderMenusProjection> findOrderMenuBundles(
            @Param("storeId") Long storeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
