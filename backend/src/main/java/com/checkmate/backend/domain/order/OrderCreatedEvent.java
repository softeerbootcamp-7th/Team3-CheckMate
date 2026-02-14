package com.checkmate.backend.domain.order;

import java.time.LocalDateTime;

public record OrderCreatedEvent(Long storeId, LocalDateTime anchor) {}
