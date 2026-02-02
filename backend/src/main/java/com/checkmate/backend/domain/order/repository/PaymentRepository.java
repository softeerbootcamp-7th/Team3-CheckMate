package com.checkmate.backend.domain.order.repository;

import com.checkmate.backend.domain.order.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {}
