package com.checkmate.backend.domain.report.repository;

import com.checkmate.backend.domain.report.entity.Report;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Optional<Report> findByStoreIdAndTargetDate(Long storeId, LocalDate targetDate);

    List<Report> findAllByStoreIdAndTargetDateBetween(
            Long storeId, LocalDate startDate, LocalDate endDate);
}
