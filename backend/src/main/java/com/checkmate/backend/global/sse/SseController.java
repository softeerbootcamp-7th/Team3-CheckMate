package com.checkmate.backend.global.sse;

import static com.checkmate.backend.global.response.SuccessStatus.*;

import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    @GetMapping("/connect")
    public SseEmitter connect(@RequestAttribute Long storeId) {
        log.info("[connect][storeId= {}]", storeId);

        SseEmitter emitter = new SseEmitter(0L);

        sseEmitterManager.addEmitter(storeId, emitter);

        emitter.onCompletion(
                () -> {
                    log.info("[SSE][disconnect][storeId={}]", storeId);
                    sseEmitterManager.removeClient(storeId);
                });
        emitter.onTimeout(
                () -> {
                    log.info("[SSE][timeout][storeId={}]", storeId);
                    sseEmitterManager.removeClient(storeId);
                });
        emitter.onError(
                e -> {
                    log.warn("[SSE][error][storeId={} reason={}]", storeId, e.getMessage());
                    sseEmitterManager.removeClient(storeId);
                });

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
    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse<Void>> subscribe(
            @RequestAttribute Long storeId, @RequestParam String topic) {
        sseEmitterManager.subscribe(storeId, topic);

        return ApiResponse.success_only(SSE_SUBSCRIBE_SUCCESS);
    }

    @Operation(summary = "SSE 구독 해제 API (용범)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "SSE 구독 해제에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
    })
    @PostMapping("/unsubscribe")
    public ResponseEntity<ApiResponse<Void>> unsubscribe(
            @RequestAttribute Long storeId, @RequestParam String topic) {

        sseEmitterManager.unsubscribe(storeId, topic);

        log.info("[unsubscribe][storeId={}, topic={}]", storeId, topic);

        return ApiResponse.success_only(SSE_UNSUBSCRIBE_SUCCESS);
    }

    @Operation(summary = "모든 SSE 구독 해제 API (용범)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "모든 SSE 구독 해제에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
    })
    @PostMapping("/unsubscribe/all")
    public ResponseEntity<ApiResponse<Void>> unsubscribeAll(@RequestAttribute Long storeId) {

        sseEmitterManager.unsubscribeAll(storeId);

        log.info("[unsubscribeAll][storeId={}]", storeId);

        return ApiResponse.success_only(SSE_UNSUBSCRIBE_ALL_SUCCESS);
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
    @PostMapping("/disconnect")
    public ResponseEntity<ApiResponse<Void>> disconnect(@RequestAttribute Long storeId) {

        sseEmitterManager.removeClient(storeId);
        log.info("[disconnect][storeId={}]", storeId);

        return ApiResponse.success_only(SSE_DISCONNECT_SUCCESS);
    }
}
