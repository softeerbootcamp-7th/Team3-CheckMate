package com.checkmate.backend.domain.order.controller;

import com.checkmate.backend.domain.order.dto.request.DummyOrderRequest;
import com.checkmate.backend.domain.order.service.TestOrderService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Order TEST", description = "주문 테스트 관련 API 입니다.")
@RestController
@RequestMapping("/api/test/orders")
@RequiredArgsConstructor
@Slf4j
public class TestOrderController {

    private final TestOrderService testOrderService;

    @Operation(summary = "주문 더미 데이터 만들기 API (용범)", description = "입력: DummyOrderRequest")
    @PostMapping("/dummy")
    public ResponseEntity<Void> generateDummyOrders(
            @LoginMember MemberSession memberSession, @RequestBody DummyOrderRequest request) {

        Long storeId = request.storeId();
        if (storeId == null) {
            storeId = memberSession.storeId();
        }

        testOrderService.generateDummyOrders(storeId, request);

        return ResponseEntity.ok().build();
    }
}
