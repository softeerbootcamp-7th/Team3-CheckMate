package com.checkmate.backend.global.exception;

import com.checkmate.backend.global.response.ErrorStatus;

public class UnauthorizedException extends BaseException {

    public UnauthorizedException(ErrorStatus errorStatus) {
        super(errorStatus);
    }
}
