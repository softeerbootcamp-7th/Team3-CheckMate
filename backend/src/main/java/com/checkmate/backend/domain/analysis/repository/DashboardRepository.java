package com.checkmate.backend.domain.analysis.repository;

import com.checkmate.backend.domain.analysis.entity.Dashboard;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DashboardRepository extends JpaRepository<Dashboard, Long> {

    List<Dashboard> findAllByStoreIdOrderByIdAsc(Long storeId);

    boolean existsByStoreIdAndName(Long storeId, String name);

    boolean existsByStoreIdAndNameAndIdNot(Long storeId, String name, Long dashboardId);

    long countByStoreId(Long storeId);
}
