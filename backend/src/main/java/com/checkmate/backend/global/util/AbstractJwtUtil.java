package com.checkmate.backend.global.util;

import com.checkmate.backend.global.exception.UnauthorizedException;
import com.checkmate.backend.global.response.ErrorStatus;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractJwtUtil {

    protected final SecretKey secretKey;

    protected AbstractJwtUtil(String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    protected Jws<Claims> parseToken(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
    }

    protected void validateToken(
            String token, ErrorStatus expiredStatus, ErrorStatus invalidStatus) {
        try {
            parseToken(token);
        } catch (ExpiredJwtException e) {
            log.debug("Expired JWT token: {}", e.getMessage());
            throw new UnauthorizedException(expiredStatus);
        } catch (SecurityException | MalformedJwtException | SignatureException e) {
            log.warn("Invalid JWT signature: {}", e.getMessage());
            throw new UnauthorizedException(invalidStatus);
        } catch (UnsupportedJwtException e) {
            log.warn("Unsupported JWT token: {}", e.getMessage());
            throw new UnauthorizedException(invalidStatus);
        } catch (IllegalArgumentException e) {
            log.warn("JWT token is invalid: {}", e.getMessage());
            throw new UnauthorizedException(invalidStatus);
        }
    }
}
