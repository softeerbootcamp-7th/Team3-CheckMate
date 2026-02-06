package com.checkmate.backend.domain.order.repository;

import com.checkmate.backend.domain.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {}
