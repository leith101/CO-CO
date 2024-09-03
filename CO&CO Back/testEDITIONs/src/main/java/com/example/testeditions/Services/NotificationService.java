package com.example.testeditions.Services;

import com.example.testeditions.Entites.Notification;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getNotificationsByUser(User user) {
        return notificationRepository.findByUser(user);
    }

    public void markNotificationAsRead(Long idn) {
        Notification notification = notificationRepository.findById(idn).orElse(null);
        if (notification != null) {
            notification.set_read(true);
            notificationRepository.save(notification);
        }
    }
}
