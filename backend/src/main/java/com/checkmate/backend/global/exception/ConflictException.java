package com.checkmate.backend.global.exception;

import com.checkmate.backend.global.response.ErrorStatus;

public class ConflictException extends BaseException {

    public ConflictException(ErrorStatus errorStatus) {
        super(errorStatus);
    }
}
