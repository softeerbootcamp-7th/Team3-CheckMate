package com.checkmate.backend.domain.analysis.controller;

import com.checkmate.backend.domain.analysis.dto.request.DashboardNameRequest;
import com.checkmate.backend.domain.analysis.dto.request.LayoutUpdateRequest;
import com.checkmate.backend.domain.analysis.dto.response.CardLayoutResponse;
import com.checkmate.backend.domain.analysis.dto.response.DashboardAnalysisDataResponse;
import com.checkmate.backend.domain.analysis.dto.response.DashboardResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.service.DashboardAnalysisService;
import com.checkmate.backend.domain.analysis.service.DashboardLayoutService;
import com.checkmate.backend.domain.analysis.service.DashboardService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Dashboard", description = "대시보드 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/analysis/dashboards")
@Slf4j
public class DashboardController {

    private final DashboardService dashboardService;
    private final DashboardLayoutService dashboardLayoutService;
    private final DashboardAnalysisService dashboardAnalysisService;

    @Operation(summary = "대시보드 목록 조회 API (한울)", description = "매장의 모든 대시보드 탭을 조회합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "대시보드 조회 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                value =
                                                        "{ \"success\": true, \"message\": \"대시보드 조회에 성공했습니다.\", \"data\": [ { \"id\": 1, \"name\": \"홈 대시보드\", \"isDefault\": true } ] }")))
    })
    @GetMapping
    public ResponseEntity<ApiResponse<List<DashboardResponse>>> getDashboards(
            @LoginMember MemberSession member) {

        List<DashboardResponse> response = dashboardService.getDashboards(member.storeId());

        return ApiResponse.success(SuccessStatus.DASHBOARD_GET_SUCCESS, response);
    }

    @Operation(summary = "사용자 대시보드 추가 API (한울)", description = "새로운 대시보드 탭을 추가합니다. (최대 5개)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "201",
                description = "대시보드 생성 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "생성 성공",
                                                value =
                                                        "{ \"success\": true, \"message\": \"대시보드 등록에 성공했습니다.\", \"data\": 1 }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "대시보드 생성 실패 (제약 조건 위반)",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "개수 초과",
                                            summary = "최대 개수 제한",
                                            value =
                                                    "{ \"success\": false, \"message\": \"대시보드는 최대 5개까지 생성 가능합니다.\", \"errorCode\": \"DASHBOARD_LIMIT_EXCEEDED\" }"),
                                    @ExampleObject(
                                            name = "이름 형식 오류",
                                            summary = "유효하지 않은 이름",
                                            value =
                                                    "{ \"success\": false, \"message\": \"유효하지 않은 대시보드 이름입니다.\", \"errorCode\": \"INVALID_DASHBOARD_NAME\" }"),
                                    @ExampleObject(
                                            name = "글자 수 초과",
                                            summary = "6자 제한 위반",
                                            value =
                                                    "{ \"success\": false, \"message\": \"대시보드 이름은 최대 6자까지 입력 가능합니다.\", \"errorCode\": \"DASHBOARD_NAME_TOO_LONG\" }"),
                                    @ExampleObject(
                                            name = "이름 중복",
                                            summary = "중복된 이름 존재",
                                            value =
                                                    "{ \"success\": false, \"message\": \"이미 존재하는 대시보드 이름입니다.\", \"errorCode\": \"DUPLICATE_DASHBOARD_NAME\" }")
                                }))
    })
    @PostMapping
    public ResponseEntity<ApiResponse<Long>> addDashboard(
            @LoginMember MemberSession member,
            @RequestBody DashboardNameRequest dashboardNameRequest) {

        Long dashboardId =
                dashboardService.addDashboard(member.storeId(), dashboardNameRequest.name());

        return ApiResponse.success(SuccessStatus.DASHBOARD_CREATE_SUCCESS, dashboardId);
    }

    @Operation(summary = "대시보드 이름 수정 API (한울)", description = "대시보드의 이름을 변경합니다. (홈 대시보드 수정 불가)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "이름 수정 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{ \"success\": true, \"message\": \"대시보드 수정에 성공했습니다.\" }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "이름 수정 실패 (제약 조건 위반)",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "기본 대시보드 수정 불가",
                                            summary = "홈 대시보드 변경 시도",
                                            value =
                                                    "{ \"success\": false, \"message\": \"기본 대시보드는 수정할 수 없습니다.\", \"errorCode\": \"DEFAULT_DASHBOARD_MODIFICATION_RESTRICTED\" }"),
                                    @ExampleObject(
                                            name = "이름 형식 오류",
                                            summary = "유효하지 않은 이름",
                                            value =
                                                    "{ \"success\": false, \"message\": \"유효하지 않은 대시보드 이름입니다.\", \"errorCode\": \"INVALID_DASHBOARD_NAME\" }"),
                                    @ExampleObject(
                                            name = "글자 수 초과",
                                            summary = "6자 제한 위반",
                                            value =
                                                    "{ \"success\": false, \"message\": \"대시보드 이름은 최대 6자까지 입력 가능합니다.\", \"errorCode\": \"DASHBOARD_NAME_TOO_LONG\" }"),
                                    @ExampleObject(
                                            name = "이름 중복",
                                            summary = "중복된 이름 존재",
                                            value =
                                                    "{ \"success\": false, \"message\": \"이미 존재하는 대시보드 이름입니다.\", \"errorCode\": \"DUPLICATE_DASHBOARD_NAME\" }")
                                })),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "403",
                description = "접근 권한 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "권한 부족",
                                                summary = "타 매장 대시보드 접근",
                                                value =
                                                        "{ \"success\": false, \"message\": \"해당 대시보드에 접근할 권한이 없습니다.\", \"errorCode\": \"DASHBOARD_ACCESS_DENIED\" }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "대시보드 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "대상 미존재",
                                                summary = "존재하지 않는 대시보드 ID",
                                                value =
                                                        "{ \"success\": false, \"message\": \"대시보드를 찾을 수 없습니다.\", \"errorCode\": \"DASHBOARD_NOT_FOUND\" }")))
    })
    @PatchMapping("/{dashboardId}/name")
    public ResponseEntity<ApiResponse<Void>> updateDashboardName(
            @LoginMember MemberSession member,
            @PathVariable Long dashboardId,
            @RequestBody DashboardNameRequest dashboardNameRequest) {

        dashboardService.updateDashboardName(
                member.storeId(), dashboardId, dashboardNameRequest.name());

        return ApiResponse.success_only(SuccessStatus.DASHBOARD_UPDATE_SUCCESS);
    }

    @Operation(summary = "대시보드 삭제 API (한울)", description = "대시보드 탭을 삭제합니다. (홈 대시보드 삭제 불가)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "대시보드 삭제 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{ \"success\": true, \"message\": \"대시보드 삭제에 성공했습니다.\" }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "삭제 실패 (제약 조건 위반)",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "기본 대시보드 삭제 불가",
                                                summary = "홈 대시보드 삭제 시도",
                                                value =
                                                        "{ \"success\": false, \"message\": \"기본 대시보드는 수정할 수 없습니다.\", \"errorCode\": \"DEFAULT_DASHBOARD_MODIFICATION_RESTRICTED\" }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "403",
                description = "접근 권한 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "권한 부족",
                                                summary = "타 매장 대시보드 삭제 시도",
                                                value =
                                                        "{ \"success\": false, \"message\": \"해당 대시보드에 접근할 권한이 없습니다.\", \"errorCode\": \"DASHBOARD_ACCESS_DENIED\" }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "대시보드 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "대상 미존재",
                                                summary = "존재하지 않는 대시보드 ID",
                                                value =
                                                        "{ \"success\": false, \"message\": \"대시보드를 찾을 수 없습니다.\", \"errorCode\": \"DASHBOARD_NOT_FOUND\" }")))
    })
    @DeleteMapping("/{dashboardId}")
    public ResponseEntity<ApiResponse<Void>> deleteDashboard(
            @LoginMember MemberSession member, @PathVariable Long dashboardId) {

        dashboardService.deleteDashboard(member.storeId(), dashboardId);

        return ApiResponse.success_only(SuccessStatus.DASHBOARD_DELETE_SUCCESS);
    }

    @Operation(
            summary = "대시보드 레이아웃 편집 및 저장 API (한울)",
            description = "특정 대시보드 내의 지표 카드 배치를 저장합니다. (홈 대시보드 수정 불가)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "레이아웃 저장 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{ \"success\": true, \"message\": \"대시보드 레이아웃 저장에 성공했습니다.\", \"data\": 1 }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "레이아웃 저장 실패 (제약 조건 위반)",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "기본 대시보드 수정 불가",
                                            summary = "홈 대시보드 레이아웃 변경 시도",
                                            value =
                                                    "{ \"success\": false, \"message\": \"기본 대시보드는 수정할 수 없습니다.\", \"errorCode\": \"DEFAULT_DASHBOARD_MODIFICATION_RESTRICTED\" }"),
                                    @ExampleObject(
                                            name = "카드 타입 오류",
                                            summary = "유효하지 않은 카드 타입",
                                            value =
                                                    "{ \"success\": false, \"message\": \"유효하지 않은 카드 타입입니다.\", \"errorCode\": \"INVALID_CARD_TYPE\" }"),
                                    @ExampleObject(
                                            name = "카드 타입 중복",
                                            summary = "중복된 카드 타입 존재",
                                            value =
                                                    "{ \"success\": false, \"message\": \"중복된 카드 타입이 존재합니다.\", \"errorCode\": \"DUPLICATE_CARD_TYPE\" }"),
                                    @ExampleObject(
                                            name = "위치 형식 오류",
                                            summary = "유효하지 않은 카드 위치",
                                            value =
                                                    "{ \"success\": false, \"message\": \"유효하지 않은 카드 위치입니다.\", \"errorCode\": \"INVALID_DASHBOARD_CARD_POSITION\" }"),
                                    @ExampleObject(
                                            name = "위치 중복",
                                            summary = "카드 위치 겹침",
                                            value =
                                                    "{ \"success\": false, \"message\": \"카드 위치가 겹칩니다.\", \"errorCode\": \"DUPLICATE_CARD_POSITION\" }")
                                })),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "403",
                description = "접근 권한 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "권한 부족",
                                                summary = "타 매장 대시보드 레이아웃 수정 시도",
                                                value =
                                                        "{ \"success\": false, \"message\": \"해당 대시보드에 접근할 권한이 없습니다.\", \"errorCode\": \"DASHBOARD_ACCESS_DENIED\" }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "대시보드 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "대상 미존재",
                                                summary = "존재하지 않는 대시보드 ID",
                                                value =
                                                        "{ \"success\": false, \"message\": \"대시보드를 찾을 수 없습니다.\", \"errorCode\": \"DASHBOARD_NOT_FOUND\" }")))
    })
    @PutMapping("/{dashboardId}/layout")
    public ResponseEntity<ApiResponse<Long>> updateDashboardLayout(
            @LoginMember MemberSession member,
            @PathVariable Long dashboardId,
            @Valid @RequestBody List<LayoutUpdateRequest> layoutUpdateRequests) {

        Long updatedId =
                dashboardLayoutService.updateLayout(
                        member.storeId(), dashboardId, layoutUpdateRequests);

        return ApiResponse.success(SuccessStatus.DASHBOARD_LAYOUT_UPDATE_SUCCESS, updatedId);
    }

    @Operation(summary = "대시보드 레이아웃 상세 조회 API (한울)", description = "특정 대시보드의 지표 카드 배치 정보를 조회합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "레이아웃 조회 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{ \"success\": true, \"message\": \"대시보드 레이아웃 조회에 성공했습니다.\", \"data\": [ { \"cardCode\": \"WTH_01_01\", \"rowNo\": 1, \"colNo\": 1 }, { \"cardCode\": \"WTH_02_01\", \"rowNo\": 1, \"colNo\": 2 } ] }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "403",
                description = "접근 권한 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "권한 부족",
                                                summary = "타 매장 대시보드 조회 시도",
                                                value =
                                                        "{ \"success\": false, \"message\": \"해당 대시보드에 접근할 권한이 없습니다.\", \"errorCode\": \"DASHBOARD_ACCESS_DENIED\" }"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "대시보드 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "대상 미존재",
                                                summary = "존재하지 않는 대시보드 ID",
                                                value =
                                                        "{ \"success\": false, \"message\": \"대시보드를 찾을 수 없습니다.\", \"errorCode\": \"DASHBOARD_NOT_FOUND\" }")))
    })
    @GetMapping("/{dashboardId}/layout")
    public ResponseEntity<ApiResponse<List<CardLayoutResponse>>> getDashboardLayout(
            @LoginMember MemberSession member, @PathVariable Long dashboardId) {

        List<CardLayoutResponse> response =
                dashboardLayoutService.getLayout(member.storeId(), dashboardId);

        return ApiResponse.success(SuccessStatus.DASHBOARD_LAYOUT_GET_SUCCESS, response);
    }

    @Operation(
            summary = "대시보드 지표 조회 API (용범)",
            description = "대시보드 지표를 조회합니다.<br>" + "SSE 최초 연결 또는 재연결 시 사용할 있습니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "지표 카드 조회에 성공했습니다.",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": true,\n"
                                                                + "  \"message\": \"지표 카드 조회에 성공했습니다.\",\n"
                                                                + "  \"data\": [\n"
                                                                + "    {\n"
                                                                + "      \"analysisCardCode\": \"WTH_01_01\",\n"
                                                                + "      \"dashboardAnalysisResponse\": {}\n"
                                                                + "    },\n"
                                                                + "    {\n"
                                                                + "      \"analysisCardCode\": \"WTH_02_01\",\n"
                                                                + "      \"dashboardAnalysisResponse\": {}\n"
                                                                + "    }\n"
                                                                + "  ]\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "지원하지 않는 지표 카드 ID입니다.",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "지원하지 않는 지표 카드 ID입니다.",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"지원하지 않는 지표 카드 ID입니다.\",\n"
                                                                + "  \"errorCode\": \"UNSUPPORTED_ANALYSIS_CARD\"\n"
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
    @GetMapping("/data")
    public ResponseEntity<ApiResponse<DashboardAnalysisDataResponse>> getDashboardAnalysisData(
            @LoginMember MemberSession member,
            @RequestParam List<AnalysisCardCode> analysisCardCodes) {

        DashboardAnalysisDataResponse response =
                dashboardAnalysisService.getDashboardAnalysisData(
                        member.storeId(), analysisCardCodes);

        return ApiResponse.success(SuccessStatus.ANALYSIS_CARD_GET_SUCCESS, response);
    }
}
