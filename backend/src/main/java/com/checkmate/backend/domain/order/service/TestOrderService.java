package com.checkmate.backend.domain.order.service;

import com.checkmate.backend.domain.menu.entity.MenuVersion;
import com.checkmate.backend.domain.menu.repository.MenuVersionTestRepository;
import com.checkmate.backend.domain.order.dto.request.DummyOrderRequest;
import com.checkmate.backend.domain.order.dto.request.ReceiptItemRequestDTO;
import com.checkmate.backend.domain.order.dto.request.ReceiptRequestDTO;
import com.checkmate.backend.domain.order.enums.OrderChannel;
import com.checkmate.backend.domain.order.enums.PaymentMethod;
import com.checkmate.backend.domain.order.enums.SalesType;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TestOrderService {
    private final OrderService orderService;
    private final MenuVersionTestRepository menuVersionTestRepository;

    /** 특정 날짜에 대해 랜덤 주문 데이터를 생성 */
    @Async
    public void generateDummyOrders(Long storeId, DummyOrderRequest request) {

        List<DummyOrderRequest.MenuItem> menuItems = request.menuItems();
        List<Long> menuIds = menuItems.stream().map(DummyOrderRequest.MenuItem::menuId).toList();

        /*
         * 메뉴 준비
         * */
        List<MenuVersion> menuVersions = new ArrayList<>();

        // case 1: menuItems 없음.
        if (menuIds.isEmpty()) {

            List<MenuVersion> activeMenuVersionsByStoreId =
                    menuVersionTestRepository.findActiveMenuVersionsByStoreId(storeId);

            if (!activeMenuVersionsByStoreId.isEmpty()) {

                Collections.shuffle(activeMenuVersionsByStoreId);

                int randomCount =
                        ThreadLocalRandom.current()
                                .nextInt(1, activeMenuVersionsByStoreId.size() + 1);

                menuVersions.addAll(
                        activeMenuVersionsByStoreId.stream().limit(randomCount).toList());
            }
        }

        // case 2: menuItems 있음
        else {
            menuVersions = menuVersionTestRepository.findActiveMenuVersionsByMenuIds(menuIds);
        }

        int orderCount = request.orderCount();

        for (int i = 0; i < orderCount; i++) {
            /*
             * 날짜 준비
             * */

            LocalDateTime orderedAt =
                    resolveOrderedAt(request.orderedAt(), request.from(), request.to());

            List<ReceiptItemRequestDTO> items = new ArrayList<>();
            int grossAmount = 0;

            for (DummyOrderRequest.MenuItem menuItem : request.menuItems()) {
                Optional<MenuVersion> menuVersion =
                        menuVersions.stream()
                                .filter(mv -> mv.getMenu().getId().equals(menuItem.menuId()))
                                .findFirst();

                if (menuVersion.isEmpty()) {
                    continue;
                }

                MenuVersion mv = menuVersion.get();

                int unitPrice = mv.getPrice();
                int quantity = menuItem.count();
                int lineAmount = unitPrice * quantity;

                grossAmount += lineAmount;

                items.add(
                        new ReceiptItemRequestDTO(
                                menuItem.menuId(), unitPrice, quantity, lineAmount));
            }

            SalesType randomSalesType =
                    SalesType.values()[
                            ThreadLocalRandom.current().nextInt(SalesType.values().length)];

            OrderChannel randomOrderChannel =
                    OrderChannel.values()[
                            ThreadLocalRandom.current().nextInt(OrderChannel.values().length)];

            PaymentMethod paymentMethod =
                    PaymentMethod.values()[
                            ThreadLocalRandom.current().nextInt(PaymentMethod.values().length)];

            ReceiptRequestDTO dto =
                    new ReceiptRequestDTO(
                            grossAmount,
                            0,
                            grossAmount,
                            randomSalesType,
                            randomOrderChannel,
                            orderedAt,
                            items,
                            paymentMethod);

            orderService.receivePosOrder(storeId, dto);
        }
    }

    public LocalDateTime resolveOrderedAt(LocalDateTime orderedAt, LocalDate from, LocalDate to) {

        // 1. orderedAt 우선
        if (orderedAt != null) {
            return orderedAt;
        }

        // 2. from / to 둘 다 있을 때 -> 랜덤 생성
        if (from != null && to != null) {

            // 순서 뒤집혀 있으면 자동 교환
            if (from.isAfter(to)) {
                LocalDate temp = from;
                from = to;
                to = temp;
            }

            LocalDateTime start = from.atStartOfDay();
            LocalDateTime end = to.plusDays(1).atStartOfDay();

            long startEpoch = start.atZone(ZoneId.systemDefault()).toEpochSecond();
            long endEpoch = end.atZone(ZoneId.systemDefault()).toEpochSecond();

            long randomEpoch = ThreadLocalRandom.current().nextLong(startEpoch, endEpoch);

            return LocalDateTime.ofInstant(
                    Instant.ofEpochSecond(randomEpoch), ZoneId.systemDefault());
        }

        // 3. 아무것도 없으면 현재 서버 시간
        return LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    }
}
