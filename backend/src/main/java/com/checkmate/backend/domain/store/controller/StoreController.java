package com.checkmate.backend.domain.store.controller;

import static com.checkmate.backend.global.response.SuccessStatus.*;

import com.checkmate.backend.domain.store.dto.request.BusinessVerifyRequestDTO;
import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.dto.response.BusinessVerifyResponseDTO;
import com.checkmate.backend.domain.store.service.BusinessVerificationService;
import com.checkmate.backend.domain.store.service.StoreService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
                responseCode = "401",
                description = "만료된 사업자 인증 토큰입니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "401",
                description = "유효하지 않은 사업자 인증 토큰입니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "해당 사용자를 찾을 수 없습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
    })
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @LoginMember MemberSession member,
            @Valid @RequestBody StoreCreateRequestDTO storeCreateRequestDTO) {
        storeService.create(member.memberId(), storeCreateRequestDTO);

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
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
    })
    @PostMapping("/business/verify")
    public ResponseEntity<ApiResponse<BusinessVerifyResponseDTO>> verifyBusiness(
            @RequestBody BusinessVerifyRequestDTO businessVerifyRequestDTO) {
        BusinessVerifyResponseDTO response =
                businessVerificationService.verifyBusiness(businessVerifyRequestDTO);

        return ApiResponse.success(BUSINESS_VERIFICATION_SUCCESS, response);
    }

    @Operation(
            summary = "포스 연동 시작 API (용범)",
            description = "성공 시 data:success<br>" + "실패 시 data:fail")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "POS 연동을 시작합니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "포스 연동 전 SSE 연결이 필요합니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
    })
    @PostMapping("/pos/connect")
    public ResponseEntity<ApiResponse<Void>> connectPOS(@LoginMember MemberSession member) {
        storeService.connectPOS(member.storeId());

        return ApiResponse.success_only(POS_CONNECT_START);
    }
}
