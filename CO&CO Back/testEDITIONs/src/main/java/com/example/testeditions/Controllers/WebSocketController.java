package com.example.testeditions.Controllers;

import com.example.testeditions.DTO.ChatMessage;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{roomId}")
    public void chat(@DestinationVariable String roomId, ChatMessage message) throws IOException {
        String sender = message.getUser();

        if (message.getFileData() != null && message.getFileName() != null && message.getFileType() != null) {
            byte[] fileContent = message.getFileData();

            message.setMessage("Received a file from " + sender + ": " + message.getFileName());

            System.out.println("Received file from " + sender + ": " + message.getFileName() + ", type: " + message.getFileType() + ", length: " + fileContent.length + " bytes");

            messagingTemplate.convertAndSend("/topic/" + roomId, message);
        } else {
            System.out.println("Received message from " + sender + ": " + message.getMessage());

            messagingTemplate.convertAndSend("/topic/" + roomId, message);
        }
    }


}
