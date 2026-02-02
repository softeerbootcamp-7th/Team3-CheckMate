package com.checkmate.backend.domain.order.dto.request;

import com.checkmate.backend.domain.order.enums.OrderChannel;
import com.checkmate.backend.domain.order.enums.PaymentMethod;
import com.checkmate.backend.domain.order.enums.SalesType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public record ReceiptRequestDTO(
        @Schema(description = "총 매출") @NotNull Integer grossAmount,
        @Schema(description = "할인 금액") @NotNull Integer discountAmount,
        @Schema(description = "실매출") @NotNull Integer netAmount,
        @Schema(description = "판매 유형") @NotNull SalesType salesType,
        @Schema(description = "주문 수단") @NotNull OrderChannel orderChannel,
        @Schema(description = "주문 시각") @NotNull LocalDateTime orderedAt,
        @Schema(description = "주문 메뉴 목록") @Size(min = 1) @Valid List<ReceiptItemRequestDTO> menus,
        @Schema(description = "결제 수단") @NotNull PaymentMethod paymentMethod) {}
