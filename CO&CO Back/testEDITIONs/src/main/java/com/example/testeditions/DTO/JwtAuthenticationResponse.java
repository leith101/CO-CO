package com.example.testeditions.DTO;

import com.example.testeditions.Entites.User;

public class JwtAuthenticationResponse {

    private String token;
    private String refreshToken;
    User userDetails;
}
