package com.checkmate.backend.domain.analysis.controller;

import com.checkmate.backend.domain.analysis.dto.response.DetailAnalysisResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.service.DetailAnalysisService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Detail", description = "상세분석 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/analysis/detail")
@Slf4j
public class DetailAnalysisController {
    private final DetailAnalysisService detailAnalysisService;

    @Operation(summary = "상세분석 조회 API (용범)")
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
                                                                + "  \"data\": {}\n"
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
    @GetMapping
    public ResponseEntity<ApiResponse<DetailAnalysisResponse>> getDetailAnalysis(
            @LoginMember MemberSession member,
            @Parameter(description = "지표 카드 ID", in = ParameterIn.QUERY, required = true)
                    @RequestParam("analysisCardCode")
                    AnalysisCardCode analysisCardCode,
            @Parameter(description = "커스텀 유무", in = ParameterIn.QUERY, required = true)
                    @RequestParam("customPeriod")
                    Boolean customPeriod,
            @Parameter(description = "커스텀 기간 시작(이상)", in = ParameterIn.QUERY)
                    @RequestParam(value = "from", required = false)
                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                    LocalDate from,
            @Parameter(description = "커스텀 기간 끝(이하)", in = ParameterIn.QUERY)
                    @RequestParam(value = "to", required = false)
                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                    LocalDate to) {

        DetailAnalysisResponse response =
                detailAnalysisService.getDetailAnalysis(
                        member.storeId(), analysisCardCode, customPeriod, from, to);

        return ApiResponse.success(SuccessStatus.ANALYSIS_CARD_GET_SUCCESS, response);
    }
}
