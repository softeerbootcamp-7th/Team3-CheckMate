package com.checkmate.backend.global.exception;

import com.checkmate.backend.global.response.ErrorStatus;

public class InternalServerException extends BaseException {

    public InternalServerException(ErrorStatus errorStatus) {
        super(errorStatus);
    }
}