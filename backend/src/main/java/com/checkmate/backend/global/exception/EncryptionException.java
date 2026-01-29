package com.checkmate.backend.global.exception;

import com.checkmate.backend.global.response.ErrorStatus;

public class EncryptionException extends BaseException {

  public EncryptionException(ErrorStatus errorStatus) {
    super(errorStatus);
  }
}
