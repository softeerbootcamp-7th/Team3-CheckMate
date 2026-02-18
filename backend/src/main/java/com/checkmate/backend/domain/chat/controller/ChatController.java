package com.checkmate.backend.domain.chat.controller;

import com.checkmate.backend.domain.chat.dto.request.ChatRequest;
import com.checkmate.backend.domain.chat.dto.response.ChatResponse;
import com.checkmate.backend.domain.chat.service.ChatService;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Chat", description = "AI Mate 챗봇 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chats")
@Slf4j
public class ChatController {

    private final ChatService chatService;

    @Operation(
            summary = "AI Mate 대화 요청 API (한울)",
            description = "이전 대화 내역과 현재 질문을 바탕으로 AI Mate의 응답을 생성합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "AI 응답 생성 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                value =
                                                        """
                                {
                                  "success": true,
                                  "message": "AI 응답 생성에 성공했습니다.",
                                  "data": {
                                    "answer": "오늘은 평소보다 객단가가 높네요! 인기 메뉴인 세트 A의 판매 비중이 늘어난 덕분이에요. 내일은 이 세트 메뉴를 상단에 배치해보는 건 어떨까요?"
                                  }
                                }
                                """))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류 (LLM 연동 및 데이터 파싱 실패)",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "외부 API 호출 실패",
                                            summary = "Gemini API 호출 중 오류 발생",
                                            value =
                                                    """
                                            {
                                              "success": false,
                                              "message": "외부 서비스 호출 중 오류가 발생했습니다.",
                                              "errorCode": "EXTERNAL_API_ERROR"
                                            }
                                            """),
                                    @ExampleObject(
                                            name = "데이터 파싱 실패",
                                            summary = "AI 응답 결과 추출 실패",
                                            value =
                                                    """
                                            {
                                              "success": false,
                                              "message": "AI 응답 데이터를 추출하는 데 실패했습니다.",
                                              "errorCode": "AI_RESPONSE_PARSE_FAILED"
                                            }
                                            """)
                                }))
    })
    @PostMapping
    public ResponseEntity<ApiResponse<ChatResponse>> getChatResponse(
            @LoginMember MemberSession member, @Valid @RequestBody ChatRequest request) {

        log.info("Chat request received from store: {}", member.storeId());

        ChatResponse response = chatService.getChatResponse(request);

        return ApiResponse.success(SuccessStatus.CHAT_GET_SUCCESS, response);
    }
}
