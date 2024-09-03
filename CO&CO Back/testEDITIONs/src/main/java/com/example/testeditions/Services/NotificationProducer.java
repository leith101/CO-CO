/*package com.example.testeditions.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationProducer {

    private static final String TOPIC = "reservation-notifications";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;


    public void sendReservationNotification(String message) {
        kafkaTemplate.send(TOPIC, message);
    }
}*/
