package com.checkmate.backend.global.exception;

import com.checkmate.backend.global.response.ErrorStatus;
import lombok.Getter;

@Getter
public abstract class BaseException extends RuntimeException {

    ErrorStatus errorStatus;

    public BaseException(ErrorStatus errorStatus) {
        super(errorStatus.getMessage());
        this.errorStatus = errorStatus;
    }
}
