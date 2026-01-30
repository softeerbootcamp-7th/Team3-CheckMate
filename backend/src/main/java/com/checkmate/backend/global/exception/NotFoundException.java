package com.checkmate.backend.global.exception;

import com.checkmate.backend.global.response.ErrorStatus;

public class NotFoundException extends BaseException {

    public NotFoundException(ErrorStatus errorStatus) {
        super(errorStatus);
    }
}
