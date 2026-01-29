package com.checkmate.backend.global.converter;

import com.checkmate.backend.global.util.EncryptionUtil;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.RequiredArgsConstructor;

@Converter
@RequiredArgsConstructor
public class StringEncryptionConverter implements AttributeConverter<String, String> {

  private final EncryptionUtil encryptionUtil;

  @Override
  public String convertToDatabaseColumn(String attribute) {
    if (attribute == null) return null;
    return encryptionUtil.encrypt(attribute);
  }

  @Override
  public String convertToEntityAttribute(String dbData) {
    if (dbData == null) return null;
    return encryptionUtil.decrypt(dbData);
  }
}
