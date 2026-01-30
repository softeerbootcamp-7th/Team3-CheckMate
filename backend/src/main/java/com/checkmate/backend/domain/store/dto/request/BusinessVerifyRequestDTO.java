package com.checkmate.backend.domain.store.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record BusinessVerifyRequestDTO(
        @Schema(description = "사업자등록번호 (숫자 10자리, '-' 제외)")
                @NotBlank(message = "사업자등록번호를 입력해주세요.")
                @Pattern(regexp = "^[0-9]{10}$", message = "사업자등록번호는 숫자 10자리로 입력해주세요.")
                String businessRegistrationNumber) {}
