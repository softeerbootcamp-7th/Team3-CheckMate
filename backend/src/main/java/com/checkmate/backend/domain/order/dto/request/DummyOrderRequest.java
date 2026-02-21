package com.checkmate.backend.domain.order.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record DummyOrderRequest(
        @Schema(description = "매장 id null 이면 토큰에 있는 storeId 사용") Long storeId,
        @Schema(description = "메뉴들") List<MenuItem> menuItems,
        @Schema(description = "주문 시각") LocalDateTime orderedAt,
        @Schema(description = "조회 시작 날짜 (이상, yyyy-MM-dd)") LocalDate from,
        @Schema(description = "조회 종료 날짜 (이하, yyyy-MM-dd)") LocalDate to,
        @Schema(description = "생성할 주문 수", example = "50") int orderCount) {

    public record MenuItem(
            @Schema(description = "메뉴 id") Long menuId,
            @Schema(description = "개수") Integer count) {}
}
