package com.checkmate.backend.domain.order.controller;

import static com.checkmate.backend.global.response.SuccessStatus.ORDER_RECEIVE_SUCCESS;

import com.checkmate.backend.domain.order.dto.request.ReceiptRequestDTO;
import com.checkmate.backend.domain.order.service.OrderService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Order", description = "주문 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
@Slf4j
public class OrderController {
    private final OrderService orderService;

    /*
     * create
     * */

    @Operation(summary = "Pos로부터 주문 받기 API (용범)", description = "입력: ReceiptRequestDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "201",
                description = "주문 수신에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "매장을 찾을 수 없습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류가 발생했습니다."),
    })
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> receivePosOrder(
            @LoginMember MemberSession member, @RequestBody ReceiptRequestDTO receiptRequestDTO) {

        orderService.receivePosOrder(member.storeId(), receiptRequestDTO);

        return ApiResponse.success(ORDER_RECEIVE_SUCCESS);
    }
}
