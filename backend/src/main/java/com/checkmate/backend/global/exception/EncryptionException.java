package com.checkmate.backend.global.exception;

public class EncryptionException extends RuntimeException {
  public EncryptionException(String message, Throwable cause) {
    super(message, cause);
  }
}
