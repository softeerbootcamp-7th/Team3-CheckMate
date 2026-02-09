package com.checkmate.backend.domain.analysis.controller;

import com.checkmate.backend.domain.analysis.dto.request.DashboardNameRequest;
import com.checkmate.backend.domain.analysis.dto.request.LayoutUpdateRequest;
import com.checkmate.backend.domain.analysis.dto.response.CardLayoutResponse;
import com.checkmate.backend.domain.analysis.dto.response.DashboardResponse;
import com.checkmate.backend.domain.analysis.service.DashboardLayoutService;
import com.checkmate.backend.domain.analysis.service.DashboardService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "대시보드 목록 조회 API (한울)", description = "매장의 모든 대시보드 탭을 조회합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "대시보드 조회에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "매장을 찾을 수 없습니다.")
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
                description = "대시보드 생성에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "이름 중복 또는 개수 초과입니다.")
    })
    @PostMapping
    public ResponseEntity<ApiResponse<Long>> addDashboard(
            @LoginMember MemberSession member,
            @RequestBody DashboardNameRequest dashboardNameRequest) {

        Long dashboardId =
                dashboardService.addDashboard(member.storeId(), dashboardNameRequest.name());

        return ApiResponse.success(SuccessStatus.DASHBOARD_CREATE_SUCCESS, dashboardId);
    }

    @Operation(summary = "대시보드 이름 수정 API (한울)", description = "대시보드의 이름을 변경합니다. (홈 대시보드 불가)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "이름 수정에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "잘못된 이름 형식이거나 홈 대시보드입니다.")
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

    @Operation(summary = "대시보드 삭제 API (한울)", description = "대시보드 탭을 삭제합니다. (홈 대시보드 불가)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "대시보드 삭제에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "홈 대시보드는 삭제할 수 없습니다.")
    })
    @DeleteMapping("/{dashboardId}")
    public ResponseEntity<ApiResponse<Void>> deleteDashboard(
            @LoginMember MemberSession member, @PathVariable Long dashboardId) {

        dashboardService.deleteDashboard(member.storeId(), dashboardId);

        return ApiResponse.success_only(SuccessStatus.DASHBOARD_DELETE_SUCCESS);
    }

    @Operation(summary = "대시보드 레이아웃 편집 및 저장 API (한울)", description = "특정 대시보드 내의 지표 카드 배치를 저장합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "레이아웃 저장에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "위치 중복 또는 잘못된 카드 코드입니다.")
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
                description = "레이아웃 조회에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "대시보드를 찾을 수 없습니다.")
    })
    @GetMapping("/{dashboardId}/layout")
    public ResponseEntity<ApiResponse<List<CardLayoutResponse>>> getDashboardLayout(
            @LoginMember MemberSession member, @PathVariable Long dashboardId) {

        List<CardLayoutResponse> response =
                dashboardLayoutService.getLayout(member.storeId(), dashboardId);

        return ApiResponse.success(SuccessStatus.DASHBOARD_LAYOUT_GET_SUCCESS, response);
    }
}
