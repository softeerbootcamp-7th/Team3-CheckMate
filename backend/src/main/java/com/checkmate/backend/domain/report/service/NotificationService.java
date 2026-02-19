package com.checkmate.backend.domain.report.service;

import com.checkmate.backend.domain.report.dto.response.NotificationResponse;
import com.checkmate.backend.domain.report.entity.Notification;
import com.checkmate.backend.domain.report.repository.NotificationRedisRepository;
import com.checkmate.backend.domain.report.repository.NotificationRepository;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.exception.NotFoundException;
import com.checkmate.backend.global.response.ErrorStatus;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationRedisRepository notificationRedisRepository;
    private final StoreRepository storeRepository;

    @Transactional
    public void createNotification(Store store, String title) {
        String content = String.format("%s 하루 리포트가 발행되었습니다.", title);
        Notification notification = Notification.builder().store(store).content(content).build();
        notificationRepository.save(notification);

        notificationRedisRepository.saveUnreadStatus(store.getId());
    }

    public boolean checkUnreadStatus(Long storeId) {
        if (notificationRedisRepository.hasUnreadStatus(storeId)) {
            return true;
        }

        Store store = findStoreById(storeId);
        return notificationRepository.existsByStoreAndIsReadFalse(store);
    }

    public List<NotificationResponse> getNotifications(Long storeId) {
        Store store = findStoreById(storeId);

        return notificationRepository.findTop8ByStoreOrderByCreatedAtDesc(store).stream()
                .map(NotificationResponse::from)
                .toList();
    }

    @Transactional
    public void markAsRead(Long storeId) {
        Store store = findStoreById(storeId);

        notificationRepository.markAllAsReadByStore(store);
        notificationRedisRepository.deleteUnreadStatus(storeId);
    }

    @Transactional
    public void deleteAllNotifications(Long storeId) {
        Store store = findStoreById(storeId);

        notificationRepository.deleteAllByStore(store);
        notificationRedisRepository.deleteUnreadStatus(storeId);
    }

    private Store findStoreById(Long storeId) {
        return storeRepository
                .findById(storeId)
                .orElseThrow(() -> new NotFoundException(ErrorStatus.STORE_NOT_FOUND_EXCEPTION));
    }
}
