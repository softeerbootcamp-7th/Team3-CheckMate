package com.checkmate.backend.global.config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import java.io.IOException;
import java.security.GeneralSecurityException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GoogleConfig {

  @Bean
  public NetHttpTransport googleHttpTransport() throws GeneralSecurityException, IOException {
    return GoogleNetHttpTransport.newTrustedTransport();
  }

  @Bean
  public JsonFactory googleJsonFactory() {
    return GsonFactory.getDefaultInstance();
  }
}
