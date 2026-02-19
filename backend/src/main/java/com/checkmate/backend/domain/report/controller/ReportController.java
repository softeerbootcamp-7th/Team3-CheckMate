package com.checkmate.backend.domain.report.controller;

import com.checkmate.backend.domain.report.dto.response.CalendarResponse;
import com.checkmate.backend.domain.report.dto.response.ReportResponse;
import com.checkmate.backend.domain.report.service.ReportService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Report", description = "하루 리포트 및 캘린더 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reports")
@Slf4j
@Validated
public class ReportController {

    private final ReportService reportService;

    @Operation(summary = "하루 리포트 상세 조회 API (한울)", description = "특정 날짜의 리포트 상세 내용을 조회합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "리포트 조회 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "리포트 상세 조회 예시",
                                                value =
                                                        """
                                            {
                                              "success": true,
                                              "message": "리포트 조회에 성공했습니다.",
                                              "data": {
                                                "targetDate": "2026-02-14",
                                                "title": {
                                                  "fullText": "오늘은 매출이 좋은 날이에요.",
                                                  "highlight": "매출이 좋은"
                                                },
                                                "statusLabel": "최상",
                                                "kpi": {
                                                  "netSales": {
                                                    "label": "실매출",
                                                    "value": "1,240,000원",
                                                    "diffVal": "+12.5%",
                                                    "diffDesc": "동요일 대비",
                                                    "trendDir": "up"
                                                  },
                                                  "orders": {
                                                    "label": "주문건수",
                                                    "value": "42건",
                                                    "diffVal": "+5.0%",
                                                    "diffDesc": "동요일 대비",
                                                    "trendDir": "up"
                                                  },
                                                  "aov": {
                                                    "label": "객단가",
                                                    "value": "29,523원",
                                                    "diffVal": "+7.1%",
                                                    "diffDesc": "동요일 대비",
                                                    "trendDir": "up"
                                                  }
                                                },
                                                "insights": [
                                                  {
                                                    "idx": 1,
                                                    "observe": "실매출이 동요일 대비 12.5% 상승했어요.",
                                                    "meaning": "이는 객단가 상승이 주요 원인일 가능성이 있어요.",
                                                    "impact": "그래서 수익성이 개선되는 흐름임을 시사해요."
                                                  }
                                                ],
                                                "strategies": [
                                                  "첫째, 고단가 메뉴의 판매 비중을 유지하기 위해 추천 메뉴 구성을 점검해보세요.",
                                                  "둘째, 피크 타임 인력 배치를 최적화하여 회전율을 높여보세요."
                                                ]
                                              }
                                            }
                                            """))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "리포트 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                value =
                                                        """
                                                        {
                                                          "success": false,
                                                          "message": "해당 날짜의 리포트를 찾을 수 없습니다.",
                                                          "errorCode": "REPORT_NOT_FOUND"
                                                        }
                                                        """)))
    })
    @GetMapping("/{date}")
    public ResponseEntity<ApiResponse<ReportResponse>> getReport(
            @LoginMember MemberSession member,
            @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2026-02-14")
                    @PathVariable
                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                    LocalDate date) {
        ReportResponse response = reportService.getReportDetail(member.storeId(), date);

        return ApiResponse.success(SuccessStatus.REPORT_GET_SUCCESS, response);
    }

    @Operation(summary = "캘린더 월간 실매출 조회 API (한울)", description = "특정 월의 일자별 실매출 요약 목록을 조회합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "캘린더 조회 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                value =
                                                        """
                                                        {
                                                          "success": true,
                                                          "message": "캘린더 조회에 성공했습니다.",
                                                          "data": {
                                                            "monthlySales": [
                                                              { "date": "2026-02-01", "netSales": 1100000 },
                                                              { "date": "2026-02-02", "netSales": 980000 }
                                                            ]
                                                          }
                                                        }
                                                        """)))
    })
    @GetMapping("/calendar")
    public ResponseEntity<ApiResponse<CalendarResponse>> getCalendar(
            @LoginMember MemberSession member,
            @RequestParam(name = "year")
                    @Min(value = 2000, message = "연도는 2000년 이후여야 합니다.")
                    @Max(value = 2100, message = "연도가 유효 범위를 초과했습니다.")
                    int year,
            @RequestParam(name = "month")
                    @Min(value = 1, message = "월은 1부터 시작해야 합니다.")
                    @Max(value = 12, message = "월은 12를 초과할 수 없습니다.")
                    int month) {
        CalendarResponse response = reportService.getMonthlyCalendar(member.storeId(), year, month);

        return ApiResponse.success(SuccessStatus.REPORT_CALENDAR_GET_SUCCESS, response);
    }
}
