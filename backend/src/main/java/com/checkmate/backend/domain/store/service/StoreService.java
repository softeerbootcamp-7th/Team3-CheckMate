package com.checkmate.backend.domain.store.service;

import static com.checkmate.backend.global.response.ErrorStatus.*;

import com.checkmate.backend.domain.member.entity.Member;
import com.checkmate.backend.domain.member.repository.MemberRepository;
import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.entity.BusinessHour;
import com.checkmate.backend.domain.store.entity.Pos;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.BusinessHourRepository;
import com.checkmate.backend.domain.store.repository.PosRepository;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.exception.NotFoundException;
import com.checkmate.backend.global.sse.SseEmitterManager;
import com.checkmate.backend.global.util.BusinessJwtUtil;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreService {
    private final StoreRepository storeRepository;
    private final MemberRepository memberRepository;
    private final BusinessHourRepository businessHourRepository;
    private final BusinessJwtUtil businessJwtUtil;
    private final SseEmitterManager sseEmitterManager;
    private final PosRepository posRepository;

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
                                    log.warn(
                                            "[create][member is not found][memberId= {}]",
                                            memberId);
                                    return new NotFoundException(MEMBER_NOT_FOUND_EXCEPTION);
                                });

        String businessAuthToken = storeCreateRequestDTO.businessAuthToken();

        businessJwtUtil.validateBusinessAuthToken(businessAuthToken);

        String businessRegistrationNumber =
                businessJwtUtil.getBusinessRegistrationNumberFromToken(businessAuthToken);

        // 매장
        Store store =
                Store.builder()
                        .businessRegistrationNumber(businessRegistrationNumber)
                        .storeName(storeCreateRequestDTO.storeName())
                        .zoneCode(storeCreateRequestDTO.zoneCode())
                        .roadAddress(storeCreateRequestDTO.roadAddress())
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
                                                                    .day(
                                                                            businessHour
                                                                                    .dayOfWeek()
                                                                                    .getKorean())
                                                                    .openTime(
                                                                            businessHour.openTime())
                                                                    .closeTime(
                                                                            businessHour
                                                                                    .closeTime())
                                                                    .closed(businessHour.closed())
                                                                    .store(store)
                                                                    .build())
                                            .toList();

                            businessHourRepository.saveAll(hours);
                        });

        return storeId;
    }

    /** 포스 연동 */
    @Async
    public void connectPOS(Long storeId) {
        SseEmitter emitter = sseEmitterManager.getEmitter(storeId);
        if (emitter == null) throw new BadRequestException(SSE_CONNECTION_REQUIRED);

        try {
            int waitSeconds = 3 + ThreadLocalRandom.current().nextInt(5);
            TimeUnit.SECONDS.sleep(waitSeconds);

            if (!ThreadLocalRandom.current().nextBoolean()) {
                emitter.send("fail");
                return;
            }

            Store store =
                    storeRepository
                            .findById(storeId)
                            .orElseThrow(
                                    () -> {
                                        log.warn(
                                                "[connectPOS][store is not found][storeId= {}]",
                                                storeId);
                                        return new NotFoundException(STORE_NOT_FOUND_EXCEPTION);
                                    });

            Pos pos = Pos.builder().store(store).build();

            posRepository.save(pos);

            emitter.send("success");
        } catch (InterruptedException | IOException e) {
            log.warn("[connectPOS][storeId= {}, reason= {}]", storeId, e.getMessage());
        }
    }
}
