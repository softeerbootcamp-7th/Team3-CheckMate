package com.checkmate.backend.domain.analysis.repository;

import com.checkmate.backend.domain.analysis.entity.Dashboard;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DashboardRepository extends JpaRepository<Dashboard, Long> {

    @Query(
            "SELECT d FROM Dashboard d WHERE d.store.id = :storeId OR d.store IS NULL ORDER BY d.id ASC")
    List<Dashboard> findAllByStoreIdWithDefault(Long storeId);

    boolean existsByStoreIdAndName(Long storeId, String name);

    boolean existsByStoreIdAndNameAndIdNot(Long storeId, String name, Long dashboardId);

    long countByStoreId(Long storeId);
}
