package com.example.testeditions.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StatisticDTO {

    @JsonProperty("active_count")
    private long activeCount;

    @JsonProperty("inactive_count")
    private long inactiveCount;


    public StatisticDTO(long activeCount, long inactiveCount) {
        this.activeCount = activeCount;
        this.inactiveCount = inactiveCount;}
}
