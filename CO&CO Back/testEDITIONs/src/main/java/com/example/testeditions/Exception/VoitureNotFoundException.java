package com.example.testeditions.Exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class VoitureNotFoundException extends RuntimeException {
    public VoitureNotFoundException(String message) {
        super(message);
    }
}
