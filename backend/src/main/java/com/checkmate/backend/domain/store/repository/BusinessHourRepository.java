package com.checkmate.backend.domain.store.repository;

import com.checkmate.backend.domain.store.entity.BusinessHour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessHourRepository extends JpaRepository<BusinessHour, Long> {}
