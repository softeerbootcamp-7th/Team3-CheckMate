package com.checkmate.backend.domain.order.repository;

import com.checkmate.backend.domain.analysis.dto.response.MenuSalesResponse;
import com.checkmate.backend.domain.order.entity.Order;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuAnalysisRepository extends JpaRepository<Order, Long> {

    /** MUN_01 (메뉴별 매출 랭킹) */
    @Query(
            "select new com.checkmate.backend.domain.analysis.dto.response.MenuSalesResponse(m.name, sum(oi.lineGrossAmount), count(*))"
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
}
