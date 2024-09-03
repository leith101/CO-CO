/*package com.example.testeditions.Services;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    private static final Logger logger = LoggerFactory.getLogger(NotificationConsumer.class);

    @KafkaListener(topics = "reservation-notifications", groupId = "my-group")
    public void listen(ConsumerRecord<String, String> record) {
        try {
            String key = record.key();
            String value = record.value();
            logger.info("Received Kafka message with key: {} and value: {}", key, value);
        } catch (Exception e) {
            logger.error("Error processing Kafka message: {}", e.getMessage(), e);
        }
    }
}*/
