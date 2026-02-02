package com.checkmate.backend.domain.order.service;

import static com.checkmate.backend.global.response.ErrorStatus.STORE_NOT_FOUND_EXCEPTION;

import com.checkmate.backend.domain.menu.entity.MenuVersion;
import com.checkmate.backend.domain.menu.repository.MenuVersionRepository;
import com.checkmate.backend.domain.order.dto.request.ReceiptItemRequestDTO;
import com.checkmate.backend.domain.order.dto.request.ReceiptRequestDTO;
import com.checkmate.backend.domain.order.entity.Order;
import com.checkmate.backend.domain.order.entity.OrderItem;
import com.checkmate.backend.domain.order.entity.Payment;
import com.checkmate.backend.domain.order.enums.PaymentStatus;
import com.checkmate.backend.domain.order.repository.OrderItemRepository;
import com.checkmate.backend.domain.order.repository.OrderRepository;
import com.checkmate.backend.domain.order.repository.PaymentRepository;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.exception.NotFoundException;
import jakarta.transaction.Transactional;
import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    private final StoreRepository storeRepository;
    private final MenuVersionRepository menuVersionRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

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
                        .orderedAt(receiptRequestDTO.orderedAt())
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

        // 3. payment

        Payment payment =
                Payment.builder()
                        .paymentMethod(receiptRequestDTO.paymentMethod().getValue())
                        .paidAmount(receiptRequestDTO.paidAmount())
                        .refundAmount(0)
                        .paymentStatus(PaymentStatus.PAID.getValue())
                        .paidAt(receiptRequestDTO.paidAt())
                        .order(order)
                        .build();

        paymentRepository.save(payment);
    }
}
