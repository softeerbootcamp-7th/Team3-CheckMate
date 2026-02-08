package com.checkmate.backend.global.auth;

import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.exception.InternalServerException;
import com.checkmate.backend.global.response.ErrorStatus;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OidcService {

    private final GoogleIdTokenVerifier verifier;

    public OidcService(@Value("${google.client.id}") String clientId) {
        this.verifier =
                new GoogleIdTokenVerifier.Builder(
                                new NetHttpTransport(), GsonFactory.getDefaultInstance())
                        .setAudience(Collections.singletonList(clientId))
                        .build();
        log.info("OidcService initialized with client ID");
    }

    public GoogleIdToken.Payload verifyIdToken(String idTokenString) {
        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                log.debug("ID token verified successfully for user: {}", payload.getSubject());
                return payload;
            }

            log.warn("Invalid ID token received");
            throw new BadRequestException(ErrorStatus.INVALID_ID_TOKEN);
        } catch (GeneralSecurityException e) {
            log.error("Security exception during ID token verification", e);
            throw new BadRequestException(ErrorStatus.INVALID_ID_TOKEN);
        } catch (IOException e) {
            log.error("IO exception during ID token verification", e);
            throw new InternalServerException(ErrorStatus.ID_TOKEN_VERIFICATION_FAILED);
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            log.error("Unexpected exception during ID token verification", e);
            throw new InternalServerException(ErrorStatus.ID_TOKEN_VERIFICATION_FAILED);
        }
    }
}
