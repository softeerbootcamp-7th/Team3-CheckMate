package com.checkmate.backend.domain.store.controller;

import static com.checkmate.backend.global.response.ErrorStatus.STORE_NOT_FOUND_EXCEPTION;
import static com.checkmate.backend.global.response.SuccessStatus.POS_CONNECT_START;
import static com.checkmate.backend.global.response.SuccessStatus.STORE_DELETE_SUCCESS;

import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.PosTestRepository;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.exception.NotFoundException;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Store TEST", description = "매장 테스트 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test/stores")
@Slf4j
public class StoreTestController {
    private final StoreRepository storeRepository;
    private final PosTestRepository posRepository;

    /*
     * delete
     * */

    @Operation(summary = "매장 삭제 API (용범)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "매장을 성공적으로 삭제했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "STORE_NOT_FOUND_EXCEPTION(매장을 찾을 수 없습니다.)"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "INTERNAL_SERVER_EXCEPTION(서버 내부 오류가 발생했습니다.)"),
    })
    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> delete(@RequestAttribute Long storeId) {
        Store store =
                storeRepository
                        .findById(storeId)
                        .orElseThrow(
                                () -> {
                                    log.warn("[delete][store is not found][storeId= {}]", storeId);
                                    return new NotFoundException(STORE_NOT_FOUND_EXCEPTION);
                                });

        storeRepository.delete(store);

        return ApiResponse.success_only(STORE_DELETE_SUCCESS);
    }

    @Operation(summary = "포스 삭제 끊기 API (용범)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "POS를 성공적으로 삭제했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "INTERNAL_SERVER_EXCEPTION(서버 내부 오류가 발생했습니다.)"),
    })
    @DeleteMapping("/pos")
    public ResponseEntity<ApiResponse<Void>> deletePos(@RequestAttribute Long storeId) {
        posRepository.deletePosByStoreId(storeId);

        return ApiResponse.success_only(POS_CONNECT_START);
    }
}
