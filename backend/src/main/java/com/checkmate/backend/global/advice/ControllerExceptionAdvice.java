package com.checkmate.backend.global.advice;

import com.checkmate.backend.global.exception.BaseException;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.ErrorStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ControllerExceptionAdvice {

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<ApiResponse<Void>> handleGlobalException(BaseException ex) {
    ErrorStatus errorStatus = ex.getErrorStatus();

    ResponseEntity<ApiResponse<Void>> errorResponse = ApiResponse.fail(errorStatus);

    return errorResponse;
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Void>> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException e) {
    ErrorStatus errorStatus = ErrorStatus.VALIDATION_EXCEPTION;

    String message =
        e.getBindingResult().getFieldErrors().stream()
            .findFirst()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .orElse(errorStatus.getMessage());

    return ApiResponse.fail(errorStatus, message);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<Void>> handleException(Exception ex) {

    log.error("Unhandled exception", ex);

    ResponseEntity<ApiResponse<Void>> errorResponse =
        ApiResponse.fail(ErrorStatus.INTERNAL_SERVER_EXCEPTION);

    return errorResponse;
  }
}
