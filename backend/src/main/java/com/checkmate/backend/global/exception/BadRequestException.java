package com.checkmate.backend.global.exception;

import com.checkmate.backend.global.response.ErrorStatus;

public class BadRequestException extends BaseException {

    public BadRequestException(ErrorStatus errorStatus) {
        super(errorStatus);
    }
}
