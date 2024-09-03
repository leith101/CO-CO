package com.example.testeditions.Services;

import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.GeoApiContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeocodingService {

    private final GeoApiContext geoApiContext;

    @Autowired
    public GeocodingService(GeoApiContext geoApiContext) {
        this.geoApiContext = geoApiContext;
    }

    public GeocodingResult[] geocodeAddress(String address) {
        try {
            return GeocodingApi.geocode(geoApiContext, address).await();
        } catch (ApiException | InterruptedException e) {
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
