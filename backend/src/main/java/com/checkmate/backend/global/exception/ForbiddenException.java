package com.checkmate.backend.global.exception;

import com.checkmate.backend.global.response.ErrorStatus;

public class ForbiddenException extends BaseException {

    public ForbiddenException(ErrorStatus errorStatus) {
        super(errorStatus);
    }
}
