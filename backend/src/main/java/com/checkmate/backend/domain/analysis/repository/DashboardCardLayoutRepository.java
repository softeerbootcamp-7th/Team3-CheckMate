package com.checkmate.backend.domain.analysis.repository;

import com.checkmate.backend.domain.analysis.entity.DashboardCardLayout;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DashboardCardLayoutRepository extends JpaRepository<DashboardCardLayout, Long> {

    List<DashboardCardLayout> findAllByDashboardId(Long dashboardId);

    @Modifying
    @Query("DELETE FROM DashboardCardLayout dcl WHERE dcl.dashboard.id = :dashboardId")
    void deleteAllByDashboardId(@Param("dashboardId") Long dashboardId);
}
