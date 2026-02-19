package com.checkmate.backend.domain.report.controller;

import com.checkmate.backend.domain.report.dto.response.NotificationResponse;
import com.checkmate.backend.domain.report.service.NotificationService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import com.checkmate.backend.global.response.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Notification", description = "알림 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
@Slf4j
@Validated
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "미열람 알림 존재 여부 확인 API (한울)", description = "읽지 않은 알림이 있는지 확인합니다. (폴링용)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "상태 조회 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "미열람 알림 있음",
                                                value =
                                                        """
                                        {
                                          "success": true,
                                          "message": "미열람 알림 상태 조회를 완료했습니다.",
                                          "data": true
                                        }
                                        """)))
    })
    @GetMapping("/unread-status")
    public ResponseEntity<ApiResponse<Boolean>> checkUnreadStatus(
            @LoginMember MemberSession member) {
        boolean hasUnread = notificationService.checkUnreadStatus(member.storeId());

        return ApiResponse.success(SuccessStatus.NOTIFICATION_STATUS_GET_SUCCESS, hasUnread);
    }

    @Operation(summary = "알림 리스트 조회 API (한울)", description = "최근 7일간의 알림 중 최신 8개를 조회합니다.")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "알림 목록 조회 성공 (결과가 있을 때와 없을 때 예시)",
            content =
                    @Content(
                            mediaType = "application/json",
                            examples = {
                                @ExampleObject(
                                        name = "1. 알림 목록 조회 성공",
                                        summary = "알림 데이터가 존재하는 경우",
                                        value =
                                                """
                                    {
                                      "success": true,
                                      "message": "알림 목록 조회를 완료했습니다.",
                                      "data": [
                                        {
                                          "notificationId": 12,
                                          "content": "2월 18일 하루 리포트가 발행되었습니다.",
                                          "isRead": false,
                                          "createdAt": "2026-02-18T17:30:00"
                                        },
                                        {
                                          "notificationId": 11,
                                          "content": "2월 17일 하루 리포트가 발행되었습니다.",
                                          "isRead": true,
                                          "createdAt": "2026-02-17T17:30:00",
                                        }
                                      ]
                                    }
                                    """),
                                @ExampleObject(
                                        name = "2. 알림 없음 (빈 상태)",
                                        summary = "알림 데이터가 없는 경우",
                                        value =
                                                """
                                    {
                                      "success": true,
                                      "message": "알림 목록 조회를 완료했습니다.",
                                      "data": []
                                    }
                                    """)
                            }))
    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getNotifications(
            @LoginMember MemberSession member) {
        List<NotificationResponse> responses =
                notificationService.getNotifications(member.storeId());

        return ApiResponse.success(SuccessStatus.NOTIFICATION_LIST_GET_SUCCESS, responses);
    }

    @Operation(
            summary = "알림 일괄 읽음 처리 API (한울)",
            description = "사용자가 알림 팝업을 닫는 시점에 호출하여, 현재 표시되던 미열람 알림들을 모두 읽음 처리합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "읽음 처리 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                value =
                                                        """
                                        {
                                          "success": true,
                                          "message": "알림을 모두 읽음 처리했습니다."
                                        }
                                        """)))
    })
    @PatchMapping("/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@LoginMember MemberSession member) {
        notificationService.markAsRead(member.storeId());

        return ApiResponse.success(SuccessStatus.NOTIFICATION_READ_SUCCESS);
    }

    @Operation(
            summary = "알림 전체 삭제 API (한울)",
            description = "알림 팝업의 '전체 삭제' 클릭 시 호출하며, 사용자의 모든 알림 내역을 삭제합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "전체 삭제 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                value =
                                                        """
                                        {
                                          "success": true,
                                          "message": "알림을 모두 삭제했습니다."
                                        }
                                        """)))
    })
    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteAllNotifications(
            @LoginMember MemberSession member) {
        notificationService.deleteAllNotifications(member.storeId());

        return ApiResponse.success(SuccessStatus.NOTIFICATION_DELETE_SUCCESS);
    }
}
