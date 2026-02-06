package com.checkmate.backend.domain.order;

public record OrderCreatedEvent(Long storeId, Long orderId) {}
