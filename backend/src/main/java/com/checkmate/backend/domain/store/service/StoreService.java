package com.checkmate.backend.domain.store.service;

import static com.checkmate.backend.global.response.ErrorStatus.MEMBER_NOT_FOUND_EXCEPTION;

import com.checkmate.backend.domain.member.entity.Member;
import com.checkmate.backend.domain.member.repository.MemberRepository;
import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.entity.BusinessHour;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.BusinessHourRepository;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.exception.NotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreService {
  private final StoreRepository storeRepository;
  private final MemberRepository memberRepository;
  private final BusinessHourRepository businessHourRepository;

  /*
   * c
   * */

  @Transactional
  public Long create(Long memberId, StoreCreateRequestDTO storeCreateRequestDTO) {
    Member member =
        memberRepository
            .findById(memberId)
            .orElseThrow(
                () -> {
                  log.warn("[create][member is not found][memberId= {}]", memberId);
                  return new NotFoundException(MEMBER_NOT_FOUND_EXCEPTION);
                });

    // 매장
    Store store =
        Store.builder()
            .businessRegistrationNumber(storeCreateRequestDTO.businessRegistrationNumber())
            .storeName(storeCreateRequestDTO.storeName())
            .zipcode(storeCreateRequestDTO.zipcode())
            .address1(storeCreateRequestDTO.address1())
            .address2(storeCreateRequestDTO.address2())
            .salesClosingHour(storeCreateRequestDTO.salesClosingHour())
            .member(member)
            .build();

    Long storeId = storeRepository.save(store).getId();

    // 매장시간
    Optional.ofNullable(storeCreateRequestDTO.businessHours())
        .ifPresent(
            businessHours -> {
              List<BusinessHour> hours =
                  businessHours.stream()
                      .map(
                          businessHour ->
                              BusinessHour.builder() // 엔티티 변환
                                  .day(businessHour.dayOfWeek().getKorean())
                                  .openTime(businessHour.openTime())
                                  .closeTime(businessHour.closeTime())
                                  .closed(businessHour.closed())
                                  .store(store)
                                  .build())
                      .toList();

              businessHourRepository.saveAll(hours);
            });

    return storeId;
  }
}
