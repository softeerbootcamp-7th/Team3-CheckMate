package com.checkmate.backend.domain.order.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record ReceiptItemRequestDTO(
        @Schema(description = "메뉴 식별자") @NotNull Long menuVersionId,
        @Schema(description = "단가") @NotNull Integer unitPrice,
        @Schema(description = "수량") @NotNull Integer quantity,
        @Schema(description = "단가 x 수량") @NotNull Integer lineGrossAmount) {}
