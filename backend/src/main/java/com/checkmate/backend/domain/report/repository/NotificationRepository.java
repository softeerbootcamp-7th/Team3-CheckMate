package com.checkmate.backend.domain.report.repository;

import com.checkmate.backend.domain.report.entity.Notification;
import com.checkmate.backend.domain.store.entity.Store;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findTop8ByStoreOrderByCreatedAtDesc(Store store);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.store = :store AND n.isRead = false")
    void markAllAsReadByStore(@Param("store") Store store);

    @Modifying
    @Query("DELETE FROM Notification n WHERE n.createdAt < :cutoffDate")
    void deleteOldNotifications(@Param("cutoffDate") LocalDateTime cutoffDate);

    boolean existsByStoreAndIsReadFalse(Store store);

    void deleteAllByStore(Store store);
}
