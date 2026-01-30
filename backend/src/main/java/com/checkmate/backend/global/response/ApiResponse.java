package com.checkmate.backend.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import org.springframework.http.ResponseEntity;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        @Schema(description = "요청 성공 여부 (true: 성공, false: 실패)", example = "true") boolean success,
        @Schema(description = "응답 메시지", example = "요청이 성공적으로 처리되었습니다.") String message,
        @Schema(
                        description = "HTTP 상태 코드보다 더 세분화된 비즈니스 에러 코드 (실패 시에만 존재)",
                        example = "EXCEED_MAX_CARD_INSTALLMENT_PLAN")
                String errorCode,
        @Schema(description = "성공 시 응답 데이터 (성공 시에만 존재)") T data) {

    public static <T> ResponseEntity<ApiResponse<T>> success(SuccessStatus status, T data) {
        ApiResponse<T> apiResponse = createSuccess(status, data);
        return ResponseEntity.status(status.getHttpStatus()).body(apiResponse);
    }

    public static ResponseEntity<ApiResponse<Void>> success_only(SuccessStatus status) {
        ApiResponse<Void> apiResponse =
                ApiResponse.<Void>builder().success(true).message(status.getMessage()).build();

        return ResponseEntity.status(status.getHttpStatus()).body(apiResponse);
    }

    public static ResponseEntity<ApiResponse<Void>> fail(ErrorStatus errorStatus) {
        ApiResponse<Void> apiResponse =
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(errorStatus.getMessage())
                        .errorCode(errorStatus.name())
                        .build();

        return ResponseEntity.status(errorStatus.getHttpStatus()).body(apiResponse);
    }

    public static ResponseEntity<ApiResponse<Void>> fail(ErrorStatus errorStatus, String message) {
        ApiResponse<Void> apiResponse =
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .errorCode(errorStatus.name())
                        .build();

        return ResponseEntity.status(errorStatus.getHttpStatus()).body(apiResponse);
    }

    public static <T> ApiResponse<T> createSuccess(SuccessStatus status, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(status.getMessage())
                .data(data)
                .build();
    }
}
