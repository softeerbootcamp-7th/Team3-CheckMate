package com.checkmate.backend.global.entity;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;

@MappedSuperclass
@Getter
public abstract class ExtendedBaseTimeEntity extends BaseTimeEntity {

  protected LocalDate createdDate;

  @PrePersist
  protected void onPrePersist() {
    if (this.createdAt == null) {
      this.createdAt = LocalDateTime.now();
    }
    this.createdDate = this.createdAt.toLocalDate();
  }
}
