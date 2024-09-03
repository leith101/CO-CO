package com.example.testeditions.Config;

import com.example.testeditions.Services.AnnonceCovImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class AnnouncementScheduler {

    private final AnnonceCovImpl annonceCovService;

    public AnnouncementScheduler(AnnonceCovImpl annonceCovService) {
        this.annonceCovService = annonceCovService;
    }

    @Scheduled(fixedRate = 60000) // Run every minute (adjust as needed)
    public void updateAnnouncementStatus() {
        annonceCovService.updateAnnouncementStatus();
    }
}
