package com.checkmate.backend.domain.analysis.dto;

import java.util.List;

/** MNU_05(인기 메뉴 조합) */
public record OrderMenus(Long orderId, List<Long> menuIds) {}
