package com.checkmate.backend.domain.order.repository;

import com.checkmate.backend.domain.order.entity.OrderMenu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {}
