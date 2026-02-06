package com.checkmate.backend.domain.order.service;

import static com.checkmate.backend.global.response.ErrorStatus.STORE_NOT_FOUND_EXCEPTION;

import com.checkmate.backend.domain.menu.entity.MenuVersion;
import com.checkmate.backend.domain.menu.repository.MenuVersionRepository;
import com.checkmate.backend.domain.order.OrderCreatedEvent;
import com.checkmate.backend.domain.order.dto.request.ReceiptItemRequestDTO;
import com.checkmate.backend.domain.order.dto.request.ReceiptRequestDTO;
import com.checkmate.backend.domain.order.entity.Order;
import com.checkmate.backend.domain.order.entity.OrderItem;
import com.checkmate.backend.domain.order.enums.OrderStatus;
import com.checkmate.backend.domain.order.repository.OrderItemRepository;
import com.checkmate.backend.domain.order.repository.OrderRepository;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.exception.NotFoundException;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    private final StoreRepository storeRepository;
    private final MenuVersionRepository menuVersionRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final ApplicationEventPublisher applicationEventPublisher; // TODO 공부

    @Transactional
    public void receivePosOrder(Long storeId, ReceiptRequestDTO receiptRequestDTO) {
        Store store =
                storeRepository
                        .findById(storeId)
                        .orElseThrow(
                                () -> {
                                    log.warn(
                                            // TODO: 로그 형식 통합
                                            "[receivePosOrder][store is not found][storeId= {}]",
                                            storeId);
                                    return new NotFoundException(STORE_NOT_FOUND_EXCEPTION);
                                });
        // 1. 주문
        Order order =
                Order.builder()
                        .grossAmount(receiptRequestDTO.grossAmount())
                        .discountAmount(receiptRequestDTO.discountAmount())
                        .netAmount(receiptRequestDTO.netAmount())
                        .salesType(receiptRequestDTO.salesType().getValue())
                        .orderChannel(receiptRequestDTO.orderChannel().getValue())
                        .orderStatus(OrderStatus.COMPLETE.getValue())
                        .paymentMethod(receiptRequestDTO.paymentMethod().getValue())
                        .orderedAt(receiptRequestDTO.orderedAt())
                        .orderDate(receiptRequestDTO.orderedAt().toLocalDate())
                        .timeSlot2H(calculate2HourSlot(receiptRequestDTO.orderedAt()))
                        .store(store)
                        .build();

        orderRepository.save(order);

        // 2. orderItem

        List<ReceiptItemRequestDTO> receiptItemRequestDTOS =
                Optional.ofNullable(receiptRequestDTO.menus()).orElse(List.of());

        List<Long> menuVersionIds =
                receiptItemRequestDTOS.stream().map(ReceiptItemRequestDTO::menuVersionId).toList();

        List<MenuVersion> menuVersions =
                menuVersionRepository.findMenuVersionsByMenuVersionIds(menuVersionIds);

        // key: menuVersionId, value: Mev
        Map<Long, MenuVersion> menuVersionById = new HashMap<>();

        for (MenuVersion menuVersion : menuVersions) {
            menuVersionById.put(menuVersion.getId(), menuVersion);
        }

        List<OrderItem> orderItems = new ArrayList<>();
        for (ReceiptItemRequestDTO receiptItemRequestDTO : receiptItemRequestDTOS) {
            Long menuVersionId = receiptItemRequestDTO.menuVersionId();
            MenuVersion menuVersion = menuVersionById.get(menuVersionId);

            OrderItem orderItem =
                    OrderItem.builder()
                            .unitPrice(receiptItemRequestDTO.unitPrice())
                            .quantity(receiptItemRequestDTO.quantity())
                            .lineGrossAmount(receiptItemRequestDTO.lineGrossAmount())
                            .order(order)
                            .menuVersion(menuVersion)
                            .build();

            orderItems.add(orderItem);
        }

        // TODO: 나중에 bulk insert로 고려
        orderItemRepository.saveAll(orderItems);

        // 이벤트 발행
        applicationEventPublisher.publishEvent(new OrderCreatedEvent(storeId, order.getId()));
    }

    private int calculate2HourSlot(LocalDateTime orderedAt) {
        int hour = orderedAt.getHour(); // 0~23
        if (hour == 0) return 0;
        if (hour >= 1 && hour < 3) return 2;
        if (hour >= 3 && hour < 5) return 4;
        if (hour >= 5 && hour < 7) return 6;
        if (hour >= 7 && hour < 9) return 8;
        if (hour >= 9 && hour < 11) return 10;
        if (hour >= 11 && hour < 13) return 12;
        if (hour >= 13 && hour < 15) return 14;
        if (hour >= 15 && hour < 17) return 16;
        if (hour >= 17 && hour < 19) return 18;
        if (hour >= 19 && hour < 21) return 20;
        if (hour >= 21 && hour < 23) return 22;

        return 24;
    }
}
