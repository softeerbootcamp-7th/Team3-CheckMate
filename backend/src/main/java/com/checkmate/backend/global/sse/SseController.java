package com.checkmate.backend.global.sse;

import static com.checkmate.backend.global.response.SuccessStatus.*;

import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Tag(name = "SSE", description = "SSE 관련 API 입니다.")
@RestController
@RequestMapping("/api/sse")
@RequiredArgsConstructor
@Slf4j
public class SseController {
    private final SseEmitterManager sseEmitterManager;

    @Operation(summary = "SSE 연결 API (용범)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description =
                        "SSE 연결 성공. 초기 더미 이벤트(dummy event)를 전송하여 "
                                + "연결이 수립되었음을 클라이언트가 확인할 수 있음.<br> "
                                + "초기 이벤트 형식: <br>"
                                + "event:connect<br>"
                                + "data:SSE connected.<br><br>"
                                + "실제 이벤트는 서버에서 발생할 때마다 전송됨.",
                content = @Content(mediaType = "text/event-stream")),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다.")
    })
    @GetMapping(value = "/connection", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter connect(@LoginMember MemberSession member) {

        Long storeId = member.storeId();

        SseEmitter emitter = sseEmitterManager.addEmitter(storeId);

        /*
         * 초기 더미 이벤트 전송
         *
         * 클라이어트 입장에서 연결 수립되었는지 확인
         *
         * 프록시 타임아웃 방지
         * 중간에 nginx, Apache, 클라우드 로드밸런서 같은 프록시가 있을 수 있는데
         * SSE연결 직후 데이터가 없으면 idle 상태로 판단 -> 연결을 끊을 수 있음.
         * */
        try {
            emitter.send(SseEmitter.event().name("connect").data("SSE connected."));
        } catch (IOException e) {
            log.warn(
                    "[SSE][send initial event failed][storeId={} reason={}]",
                    storeId,
                    e.getMessage());
        }

        return emitter;
    }

    @Operation(summary = "SSE 구독 API (용범)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "SSE 구독에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
    })
    @PostMapping("/subscriptions")
    public ResponseEntity<ApiResponse<Void>> subscribe(
            @LoginMember MemberSession member,
            @Valid @RequestBody SubscriptionTopicsRequest subscriptionTopicsRequest) {

        Long storeId = member.storeId();

        sseEmitterManager.subscribe(storeId, subscriptionTopicsRequest);

        return ApiResponse.success(SSE_SUBSCRIBE_SUCCESS);
    }

    @Operation(
            summary = "SSE 구독 해제 API (용범)",
            description =
                    "RequestBody를 전달하지 않거나 topics가 비어있으면 "
                            + "해당 store의 모든 SSE 구독을 해제합니다.<br> "
                            + "특정 topic만 해제하려면 topics에 해당 topic을 포함하세요.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "SSE 구독 해제에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
    })
    @DeleteMapping("/subscriptions")
    public ResponseEntity<ApiResponse<Void>> unsubscribe(
            @LoginMember MemberSession member,
            @RequestBody SubscriptionTopicsRequest subscriptionTopicsRequest) {

        Long storeId = member.storeId();

        sseEmitterManager.unsubscribe(storeId, subscriptionTopicsRequest);

        return ApiResponse.success(SSE_UNSUBSCRIBE_SUCCESS);
    }

    @Operation(summary = "SSE 연결 종료 API")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "SSE 연결을 종료했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
    })
    @DeleteMapping("/connection")
    public ResponseEntity<ApiResponse<Void>> disconnect(@LoginMember MemberSession member) {

        Long storeId = member.storeId();

        sseEmitterManager.removeClient(storeId);

        return ApiResponse.success(SSE_DISCONNECT_SUCCESS);
    }

    @Operation(summary = "SSE 연결 조회 API (용범)")
    @GetMapping(value = "/emitters")
    public ResponseEntity<ApiResponse<Map<Long, String>>> getEmitters(
            @LoginMember MemberSession member) {

        Map<Long, String> emitterIds = new HashMap<>();

        sseEmitterManager
                .getEmitters()
                .forEach(
                        (storeId, session) ->
                                emitterIds.put(storeId, "emitterId=" + session.emitterId()));

        return ApiResponse.success(SSE_EMITTER_LIST_SUCCESS, emitterIds);
    }

    @Operation(summary = "SSE 구독 목록 조회 API (용범)")
    @GetMapping(value = "/subscriptions")
    public ResponseEntity<ApiResponse<Set<AnalysisCardCode>>> get(
            @LoginMember MemberSession member, @RequestParam Long storeId) {
        Set<AnalysisCardCode> topics = sseEmitterManager.getSubscribedTopics(storeId);

        return ApiResponse.success(SSE_SUBSCRIBE_LIST_SUCCESS, topics);
    }
}
