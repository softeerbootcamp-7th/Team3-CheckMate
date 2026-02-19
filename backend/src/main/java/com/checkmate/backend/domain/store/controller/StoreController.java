package com.checkmate.backend.domain.store.controller;

import static com.checkmate.backend.global.response.SuccessStatus.*;

import com.checkmate.backend.domain.store.dto.request.BusinessVerifyRequestDTO;
import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.dto.response.BusinessVerifyResponseDTO;
import com.checkmate.backend.domain.store.dto.response.StoreResponse;
import com.checkmate.backend.domain.store.service.BusinessVerificationService;
import com.checkmate.backend.domain.store.service.StoreService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
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
                description = "매장 등록 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": true,\n"
                                                                + "  \"message\": \"매장 등록 성공했습니다.\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "잘못된 요청",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "이미 매장 등록됨",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"이미 매장을 등록하셨습니다.\",\n"
                                                                + "  \"errorCode\": \"STORE_ALREADY_REGISTERED\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "401",
                description = "사업자 인증 토큰 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "토큰 만료",
                                            value =
                                                    "{\n"
                                                            + "  \"success\": false,\n"
                                                            + "  \"message\": \"만료된 사업자 인증 토큰입니다.\",\n"
                                                            + "  \"errorCode\": \"EXPIRED_BUSINESS_AUTH_TOKEN\"\n"
                                                            + "}"),
                                    @ExampleObject(
                                            name = "토큰 유효하지 않음",
                                            value =
                                                    "{\n"
                                                            + "  \"success\": false,\n"
                                                            + "  \"message\": \"유효하지 않은 사업자 인증 토큰입니다.\",\n"
                                                            + "  \"errorCode\": \"INVALID_BUSINESS_AUTH_TOKEN\"\n"
                                                            + "}")
                                })),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "사용자 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "사용자 미존재 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"해당 사용자를 찾을 수 없습니다.\",\n"
                                                                + "  \"errorCode\": \"MEMBER_NOT_FOUND_EXCEPTION\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "서버 오류 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"서버 내부 오류가 발생했습니다.\",\n"
                                                                + "  \"errorCode\": \"INTERNAL_SERVER_ERROR\"\n"
                                                                + "}")))
    })
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @LoginMember MemberSession member,
            @Valid @RequestBody StoreCreateRequestDTO storeCreateRequestDTO) {
        storeService.create(member.memberId(), storeCreateRequestDTO);

        return ApiResponse.success(STORE_CREATE_SUCCESS);
    }

    @Operation(
            summary = "사업자등록번호 검증 API (용범)",
            description = "입력: BusinessVerifyRequestDTO<br>" + "출력: BusinessVerifyResponseDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "사업자 인증 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": true,\n"
                                                                + "  \"message\": \"사업자 인증 성공했습니다.\",\n"
                                                                + "  \"data\": {\n"
                                                                + "    \"businessAuthToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"\n"
                                                                + "  }\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "유효하지 않은 사업자번호",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "사업자번호 유효하지 않음 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"유효하지 않은 사업자번호입니다.\",\n"
                                                                + "  \"errorCode\": \"BUSINESS_NUMBER_INVALID_EXCEPTION\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "서버 오류 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"서버 내부 오류가 발생했습니다.\",\n"
                                                                + "  \"errorCode\": \"INTERNAL_SERVER_ERROR\"\n"
                                                                + "}")))
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
            description =
                    "<연동 시작><br>"
                            + "event: pos-connect<br>data: STARTED <br><br>"
                            + "<연동 성공><br>"
                            + "event: pos-connect<br>data: SUCCESS <br><br>"
                            + "<연동 실패><br>"
                            + "event: pos-connect<br>data: FAILURE ")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "POS 연동 시작 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": true,\n"
                                                                + "  \"message\": \"POS 연동을 시작합니다.\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "POS 연동 전 SSE 연결 필요",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "SSE 연결 필요 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"포스 연동 전 SSE 연결이 필요합니다.\",\n"
                                                                + "  \"errorCode\": \"SSE_CONNECTION_REQUIRED\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "매장 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "매장 미존재 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"매장을 찾을 수 없습니다.\",\n"
                                                                + "  \"errorCode\": \"STORE_NOT_FOUND_EXCEPTION\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "서버 오류 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"서버 내부 오류가 발생했습니다.\",\n"
                                                                + "  \"errorCode\": \"INTERNAL_SERVER_ERROR\"\n"
                                                                + "}")))
    })
    @PostMapping("/pos/connect")
    public ResponseEntity<ApiResponse<Void>> connectPOS(@LoginMember MemberSession member) {
        storeService.connectPOS(member.storeId());

        return ApiResponse.success(POS_CONNECT_START);
    }

    /*
     * read
     * */

    @Operation(summary = "매장 정보 조회 API (용범)", description = "출력: StoreResponse")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "매장 정보 조회 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": true,\n"
                                                                + "  \"message\": \"매장 정보 조회에 성공했습니다.\",\n"
                                                                + "  \"data\": {\n"
                                                                + "    \"storeName\": \"한울 매장\",\n"
                                                                + "    \"salesClosingHour\": 21,\n"
                                                                + "    \"businessHours\": [\n"
                                                                + "      { \"dayOfWeek\": \"월\", \"openTime\": \"09:00\", \"closeTime\": \"21:00\", \"closed\": false, \"open24Hours\": false },\n"
                                                                + "      { \"dayOfWeek\": \"화\", \"openTime\": \"09:00\", \"closeTime\": \"21:00\", \"closed\": false, \"open24Hours\": false }\n"
                                                                + "    ]\n"
                                                                + "  }\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "매장 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "매장 미존재 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"매장을 찾을 수 없습니다.\",\n"
                                                                + "  \"errorCode\": \"STORE_NOT_FOUND_EXCEPTION\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "서버 오류 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"서버 내부 오류가 발생했습니다.\",\n"
                                                                + "  \"errorCode\": \"INTERNAL_SERVER_ERROR\"\n"
                                                                + "}")))
    })
    @GetMapping
    public ResponseEntity<ApiResponse<StoreResponse>> getStore(@LoginMember MemberSession member) {
        StoreResponse response = storeService.getStore(member.storeId());

        return ApiResponse.success(STORE_INFO_FETCH_SUCCESS, response);
    }
}
