package com.checkmate.backend.domain.store.service;

import static com.checkmate.backend.global.response.ErrorStatus.BUSINESS_NUMBER_INVALID_EXCEPTION;

import com.checkmate.backend.domain.store.dto.request.BusinessVerifyRequestDTO;
import com.checkmate.backend.domain.store.dto.response.BusinessVerifyResponseDTO;
import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.util.BusinessJwtUtil;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BusinessVerificationService {
    private final BusinessJwtUtil businessJwtUtil;

    /**
     * 사업자등록번호 검증 + 인증 토큰 발급 (Mock)<br>
     * <br>
     * TODO: 외부 사업자등록번호 검증 Open API 연동<br>
     */
    public BusinessVerifyResponseDTO verifyBusiness(
            BusinessVerifyRequestDTO businessVerifyRequestDTO) {

        String businessRegistrationNumber = businessVerifyRequestDTO.businessRegistrationNumber();

        // TODO: Mock 로직 제거
        // Mock: 20% 확률로 실패
        if (ThreadLocalRandom.current().nextInt(5) < 1) { // 0일 때만 실패 → 20%
            throw new BadRequestException(BUSINESS_NUMBER_INVALID_EXCEPTION);
        }

        // 사업자 인증 토큰 발급
        String businessAuthToken = businessJwtUtil.generateBizAuthToken(businessRegistrationNumber);

        return new BusinessVerifyResponseDTO(businessAuthToken);
    }
}
