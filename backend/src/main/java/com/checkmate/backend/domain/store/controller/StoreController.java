package com.checkmate.backend.domain.store.controller;

import static com.checkmate.backend.global.response.SuccessStatus.STORE_CREATE_SUCCESS;

import com.checkmate.backend.domain.store.dto.request.StoreCreateRequestDTO;
import com.checkmate.backend.domain.store.service.StoreService;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Store", description = "매장 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store")
public class StoreController {
  private final StoreService storeService;

  /*
   * c
   * */

  @Operation(summary = "매장 등록 API (용범)", description = "입력: StoreCreateRequestDTO")
  @ApiResponses({
    @io.swagger.v3.oas.annotations.responses.ApiResponse(
        responseCode = "201",
        description = "매장 등록 성공"),
    @io.swagger.v3.oas.annotations.responses.ApiResponse(
        responseCode = "404",
        description = "해당 사용자를 찾을 수 없습니다."),
  })
  @PostMapping
  public ResponseEntity<ApiResponse<Void>> create(
      @RequestAttribute("memberId") Long memberId,
      @RequestBody StoreCreateRequestDTO storeCreateRequestDTO) {
    storeService.create(memberId, storeCreateRequestDTO);

    return ApiResponse.success_only(STORE_CREATE_SUCCESS);
  }
}
