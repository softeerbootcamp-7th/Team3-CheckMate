package com.checkmate.backend.domain.store.controller;

import static com.checkmate.backend.global.response.SuccessStatus.BUSINESS_VERIFICATION_SUCCESS;
import static com.checkmate.backend.global.response.SuccessStatus.STORE_CREATE_SUCCESS;

import com.checkmate.backend.domain.store.dto.request.BusinessVerifyRequestDTO;
import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.dto.response.BusinessVerifyResponseDTO;
import com.checkmate.backend.domain.store.service.BusinessVerificationService;
import com.checkmate.backend.domain.store.service.StoreService;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Store", description = "매장 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stores")
public class StoreController {
    private final StoreService storeService;
    private final BusinessVerificationService businessVerificationService;

    /*
     * create
     * */

    @Operation(summary = "매장 등록 API (용범)", description = "입력: StoreCreateRequestDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "201",
                description = "매장 등록 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "해당 사용자를 찾을 수 없습니다."),
    })
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @RequestAttribute("memberId") Long memberId,
            @RequestBody StoreCreateRequestDTO storeCreateRequestDTO) {
        storeService.create(memberId, storeCreateRequestDTO);

        return ApiResponse.success_only(STORE_CREATE_SUCCESS);
    }

    @Operation(
            summary = "사업자등록번호 검증 API (용범)",
            description = "입력: BusinessVerifyRequestDTO<br>" + "출력: BusinessVerifyResponseDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "사업자 인증 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "유효하지 않은 사업자번호입니다."),
    })
    @PostMapping("/business/verify")
    public ResponseEntity<ApiResponse<BusinessVerifyResponseDTO>> verifyBusiness(
            @RequestBody BusinessVerifyRequestDTO businessVerifyRequestDTO) {
        BusinessVerifyResponseDTO response =
                businessVerificationService.verifyBusiness(businessVerifyRequestDTO);

        return ApiResponse.success(BUSINESS_VERIFICATION_SUCCESS, response);
    }
}
