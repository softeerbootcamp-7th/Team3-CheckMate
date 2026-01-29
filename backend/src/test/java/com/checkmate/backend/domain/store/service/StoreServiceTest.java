package com.checkmate.backend.domain.store.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

import com.checkmate.backend.domain.member.entity.Member;
import com.checkmate.backend.domain.member.repository.MemberRepository;
import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.entity.BusinessHour;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.enums.DayOfWeekType;
import com.checkmate.backend.domain.store.repository.BusinessHourRepository;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.exception.NotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Transactional
class StoreServiceTest {

  @Autowired private StoreService storeService;

  @Autowired private MemberRepository memberRepository;

  @Autowired private StoreRepository storeRepository;

  @Autowired private BusinessHourRepository businessHourRepository;

  @Autowired private Validator validator;

  @Test
  @DisplayName("매장 등록 성공 - 영업시간 포함")
  void createStore_success() {
    // given
    Member member = createMember();

    StoreCreateRequestDTO dto =
        new StoreCreateRequestDTO(
            "1234567890",
            "토큰",
            "테스트매장",
            "12345",
            "서울시 강남구",
            "테스트빌딩 1층",
            createValidBusinessHours(),
            23);

    // when
    Long storeId = storeService.create(member.getId(), dto);

    // then
    Store store = storeRepository.findById(storeId).orElseThrow();
    List<BusinessHour> hours = businessHourRepository.findAll();

    assertThat(store.getStoreName()).isEqualTo("테스트매장");
    assertThat(store.getMember().getId()).isEqualTo(member.getId());
    assertThat(hours).hasSize(7);
  }

  @Test
  @DisplayName("DTO 검증 실패 - 요일 7개 미만")
  void validate_fail_missing_day() {
    // given
    StoreCreateRequestDTO dto =
        new StoreCreateRequestDTO(
            "1234567890",
            "토큰",
            "테스트매장",
            "12345",
            "서울시",
            "상세주소",
            createInvalidBusinessHours(), // 6일만
            23);

    // when
    Set<ConstraintViolation<StoreCreateRequestDTO>> violations = validator.validate(dto);

    // then
    assertThat(violations).isNotEmpty();
    assertThat(violations.iterator().next().getMessage()).contains("월~일 모두 입력");
  }

  @Test
  @DisplayName("매장 등록 실패 - User 없음")
  void createStore_fail_userNotFound() {
    // given
    StoreCreateRequestDTO dto =
        new StoreCreateRequestDTO(
            "1234567890", "토큰", "테스트매장", "12345", "서울", "상세", createValidBusinessHours(), 23);

    // expect
    assertThatThrownBy(() -> storeService.create(999L, dto)).isInstanceOf(NotFoundException.class);
  }

  private List<StoreCreateRequestDTO.BusinessHour> createValidBusinessHours() {
    return Arrays.stream(DayOfWeekType.values())
        .map(day -> new StoreCreateRequestDTO.BusinessHour(day, "09:00", "18:00", false))
        .toList();
  }

  private List<StoreCreateRequestDTO.BusinessHour> createInvalidBusinessHours() {
    return Arrays.stream(DayOfWeekType.values())
        .limit(6)
        .map(day -> new StoreCreateRequestDTO.BusinessHour(day, "09:00", "18:00", false))
        .toList();
  }

  private Member createMember() {
    Member member = new Member();
    return memberRepository.save(member);
  }
}
