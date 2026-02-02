package com.checkmate.backend.global.sse;

import static com.checkmate.backend.global.response.SuccessStatus.*;

import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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
                description = "SSE 연결 성공 (실제 데이터는 연결 후 서버에서 전송됨)",
                content = @Content(mediaType = "text/event-stream")),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
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
