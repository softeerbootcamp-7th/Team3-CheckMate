package com.checkmate.backend.global.util;

import com.checkmate.backend.global.exception.EncryptionException;
import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EncryptionUtil {
  private static final String ALGORITHM = "AES/CBC/PKCS5Padding";
  private static final String KEY_ALGORITHM = "AES";
  private static final int IV_SIZE = 16;
  private static final int KEY_SIZE = 32;

  @Value("${encryption.secret-key}")
  private String secretKey;

  private SecretKeySpec keySpec;
  private final SecureRandom secureRandom = new SecureRandom();

  @PostConstruct
  private void init() {
    validateSecretKey();
    this.keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), KEY_ALGORITHM);
  }

  private void validateSecretKey() {
    if (secretKey == null || secretKey.isEmpty()) {
      throw new IllegalStateException("Secret key must not be null or empty");
    }
    if (secretKey.getBytes(StandardCharsets.UTF_8).length != KEY_SIZE) {
      throw new IllegalStateException("Secret key must be exactly " + KEY_SIZE + " bytes");
    }
  }

  public String encrypt(String plainText) {
    if (plainText == null || plainText.isEmpty()) {
      throw new IllegalArgumentException("Plain text must not be null or empty");
    }

    try {
      // 랜덤 IV 생성
      byte[] iv = generateIv();

      Cipher cipher = Cipher.getInstance(ALGORITHM);
      cipher.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv));
      byte[] encrypted = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

      // IV와 암호문을 결합 (IV + 암호문)
      byte[] combined = new byte[IV_SIZE + encrypted.length];
      System.arraycopy(iv, 0, combined, 0, IV_SIZE);
      System.arraycopy(encrypted, 0, combined, IV_SIZE, encrypted.length);

      return Base64.getEncoder().encodeToString(combined);
    } catch (Exception e) {
      throw new EncryptionException("Encryption failed", e);
    }
  }

  public String decrypt(String cipherText) {
    if (cipherText == null || cipherText.isEmpty()) {
      throw new IllegalArgumentException("Cipher text must not be null or empty");
    }

    try {
      byte[] combined = Base64.getDecoder().decode(cipherText);

      if (combined.length < IV_SIZE) {
        throw new IllegalArgumentException("Invalid cipher text");
      }

      // IV와 암호문 분리
      byte[] iv = new byte[IV_SIZE];
      byte[] encrypted = new byte[combined.length - IV_SIZE];
      System.arraycopy(combined, 0, iv, 0, IV_SIZE);
      System.arraycopy(combined, IV_SIZE, encrypted, 0, encrypted.length);

      Cipher cipher = Cipher.getInstance(ALGORITHM);
      cipher.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv));
      byte[] decrypted = cipher.doFinal(encrypted);

      return new String(decrypted, StandardCharsets.UTF_8);
    } catch (Exception e) {
      throw new EncryptionException("Decryption failed", e);
    }
  }

  private byte[] generateIv() {
    byte[] iv = new byte[IV_SIZE];
    secureRandom.nextBytes(iv);
    return iv;
  }
}
