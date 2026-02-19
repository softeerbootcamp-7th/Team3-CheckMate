package com.checkmate.backend.domain.store.service;

import static com.checkmate.backend.global.response.ErrorStatus.*;

import com.checkmate.backend.domain.member.entity.Member;
import com.checkmate.backend.domain.member.repository.MemberRepository;
import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.dto.response.StoreClosingTimeResponse;
import com.checkmate.backend.domain.store.dto.response.StoreResponse;
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
import com.checkmate.backend.global.util.TimeUtil;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    private static final String POS_CONNECT = "pos-connect";
    private static final String POS_CONNECT_STARTED = "STARTED";
    private static final String POS_CONNECT_SUCCESS = "SUCCESS";
    private static final String POS_CONNECT_FAILURE = "FAILURE";

    private static final String[] DAYS = {"", "월", "화", "수", "목", "금", "토", "일"};

    /*
     * c
     * */

    @Transactional
    public Long create(Long memberId, StoreCreateRequestDTO storeCreateRequestDTO) {

        // 이미 매장 등록했는지 검증
        storeRepository
                .findStoreByMemberId(memberId)
                .ifPresent(
                        store -> {
                            log.warn("[create][store already registered][memberId={}]", memberId);
                            throw new BadRequestException(STORE_ALREADY_REGISTERED);
                        });

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
        List<StoreCreateRequestDTO.BusinessHourRequest> businessHourRequests =
                Optional.ofNullable(storeCreateRequestDTO.businessHourRequests())
                        .orElseGet(List::of);

        List<BusinessHour> businessHours =
                businessHourRequests.stream()
                        .map((businessHourRequest) -> businessHourRequest.toEntity(store))
                        .toList();

        businessHourRepository.saveAll(businessHours);

        return storeId;
    }

    /** 포스 연동 */
    @Async
    public void connectPOS(Long storeId) {
        SseEmitter emitter = sseEmitterManager.getEmitter(storeId);
        if (emitter == null) throw new BadRequestException(SSE_CONNECTION_REQUIRED);

        try {
            // 포스 연동 시작
            emitter.send(SseEmitter.event().name(POS_CONNECT).data(POS_CONNECT_STARTED));

            int waitSeconds = 3 + ThreadLocalRandom.current().nextInt(5);
            TimeUnit.SECONDS.sleep(waitSeconds);

            // Mock: 20% 확률로 POS 연결 실패
            if (ThreadLocalRandom.current().nextInt(5) < 1) { // 0일 때만 실패 → 20%
                emitter.send(SseEmitter.event().name(POS_CONNECT).data(POS_CONNECT_FAILURE));
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

            emitter.send(SseEmitter.event().name(POS_CONNECT).data(POS_CONNECT_SUCCESS));
        } catch (InterruptedException | IOException e) {
            log.warn("[connectPOS][storeId= {}, reason= {}]", storeId, e.getMessage());
        }
    }

    /*
     * read
     * */

    /** 매장 정보 조회 */
    public StoreResponse getStore(Long storeId) {

        // 매장 조회
        Store store =
                storeRepository
                        .findById(storeId)
                        .orElseThrow(
                                () -> {
                                    log.warn("[getStore][store is not found][storeId={}]", storeId);
                                    return new BadRequestException(STORE_NOT_FOUND_EXCEPTION);
                                });

        // 영업 시간 조회
        List<StoreResponse.BusinessHourResponse> businessHours =
                businessHourRepository.findBusinessHoursByStoreId(storeId).stream()
                        .map(StoreResponse.BusinessHourResponse::of)
                        .toList();

        StoreResponse response = StoreResponse.of(store, businessHours);

        return response;
    }

    public StoreClosingTimeResponse getNextClosingTime(Long storeId) {
        Store store =
                storeRepository
                        .findById(storeId)
                        .orElseThrow(() -> new NotFoundException(STORE_NOT_FOUND_EXCEPTION));

        List<BusinessHour> businessHours =
                businessHourRepository.findBusinessHoursByStoreId(storeId);
        LocalDateTime now = LocalDateTime.now();

        // 1. 요일 추출
        int todayValue = TimeUtil.getDayOfWeekValue(now.toLocalDate());
        String todayStr = DAYS[todayValue];
        String yesterdayStr = DAYS[todayValue == 1 ? 7 : todayValue - 1];

        // 2. 24시간 매장 (정산 시간 기준)
        BusinessHour todayHour = findBhByDay(businessHours, todayStr);
        if (todayHour != null && todayHour.isOpen24Hours()) {
            int salesHour =
                    (store.getSalesClosingHour() == null || store.getSalesClosingHour() == 24)
                            ? 0
                            : store.getSalesClosingHour();

            LocalDateTime salesClosingTime = now.toLocalDate().atTime(salesHour, 0);
            if (!now.isBefore(salesClosingTime)) {
                salesClosingTime = salesClosingTime.plusDays(1);
            }
            return new StoreClosingTimeResponse(salesClosingTime);
        }

        // 3. 일반 매장: "현재 진행 중인" 또는 "가장 가까운" 마감 시간 찾기

        // Case A: 어제 영업이 오늘 새벽에 끝나는 중인지 확인
        BusinessHour yesterdayBh = findBhByDay(businessHours, yesterdayStr);
        if (yesterdayBh != null && yesterdayBh.isClosesNextDay()) {
            LocalDateTime closingDateTime =
                    makeDateTime(now.toLocalDate(), yesterdayBh.getCloseTime());
            if (now.isBefore(closingDateTime)) {
                return new StoreClosingTimeResponse(closingDateTime);
            }
        }

        // Case B: 오늘 포함 향후 7일 탐색
        for (int i = 0; i <= 7; i++) {
            LocalDateTime checkDate = now.plusDays(i);
            String checkDayStr = DAYS[(todayValue + i - 1) % 7 + 1];

            BusinessHour bh = findBhByDay(businessHours, checkDayStr);
            if (bh == null || bh.isClosed()) continue;

            // 익일 마감이면 날짜를 하루 더함
            LocalDateTime closingDateTime =
                    makeDateTime(checkDate.toLocalDate(), bh.getCloseTime());
            if (bh.isClosesNextDay()) {
                closingDateTime = closingDateTime.plusDays(1);
            }

            if (closingDateTime.isAfter(now)) {
                return new StoreClosingTimeResponse(closingDateTime);
            }
        }

        throw new BadRequestException(INTERNAL_SERVER_EXCEPTION);
    }

    // "24:00" 대응 가능한 안전한 LocalDateTime 생성기
    private LocalDateTime makeDateTime(LocalDate date, String timeStr) {
        if ("24:00".equals(timeStr)) {
            return date.plusDays(1).atStartOfDay();
        }
        return date.atTime(LocalTime.parse(timeStr));
    }

    private BusinessHour findBhByDay(List<BusinessHour> hours, String day) {
        return hours.stream().filter(h -> h.getDay().equals(day)).findFirst().orElse(null);
    }
}
