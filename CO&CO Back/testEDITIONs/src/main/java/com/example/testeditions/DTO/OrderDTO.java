package com.example.testeditions.DTO;

import lombok.Getter;

import java.util.List;

@Getter
public class OrderDTO {

    private Long id;

    private String fullName;
    private String adress;
    private String phone;
    List<CartDTO> items;

}