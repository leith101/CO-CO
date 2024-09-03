package com.example.testeditions.Services;

public class VerificationTokenNotFoundException extends RuntimeException {

    public VerificationTokenNotFoundException(String message) {
        super(message);
    }
}
