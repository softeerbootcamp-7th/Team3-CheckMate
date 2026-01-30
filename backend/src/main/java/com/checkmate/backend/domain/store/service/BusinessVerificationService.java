package com.checkmate.backend.domain.store.service;

import static com.checkmate.backend.global.response.ErrorStatus.BUSINESS_NUMBER_INVALID_EXCEPTION;

import com.checkmate.backend.domain.store.dto.request.BusinessVerifyRequestDTO;
import com.checkmate.backend.domain.store.dto.response.BusinessVerifyResponseDTO;
import com.checkmate.backend.global.exception.BadRequestException;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BusinessVerificationService {

    /**
     * 사업자등록번호 검증 + 인증 토큰 발급 (Mock)<br>
     * <br>
     * TODO: 외부 사업자등록번호 검증 Open API 연동<br>
     * TODO: 검증 성공 시 실제 BusinessAuthToken 발급 로직으로 교체
     */
    public BusinessVerifyResponseDTO verifyBusiness(
            BusinessVerifyRequestDTO businessVerifyRequestDTO) {

        String businessRegistrationNumber = businessVerifyRequestDTO.businessRegistrationNumber();

        // TODO: Mock 로직 제거
        // Mock: 50% 확률로 실패
        if (ThreadLocalRandom.current().nextBoolean()) {
            throw new BadRequestException(BUSINESS_NUMBER_INVALID_EXCEPTION);
        }

        // TODO: 실제 JWT 발급 로직 연결
        return new BusinessVerifyResponseDTO("토큰임");
    }
}
