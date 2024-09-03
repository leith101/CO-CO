package com.example.testeditions.Services;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AddressValidationService {

    @Autowired
    private GeoApiContext geoApiContext;

   // public boolean isValidAddress(String address) {
        //try {
         //   GeocodingResult[] results = GeocodingApi.geocode(geoApiContext, address).await();
        //    return results != null && results.length > 0;
     //   } catch (ApiException | InterruptedException | IOException e) {
      //      e.printStackTrace();
          //  return false;
     //   }
   // }
}
