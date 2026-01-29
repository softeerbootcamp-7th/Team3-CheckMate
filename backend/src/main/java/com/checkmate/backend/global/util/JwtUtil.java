package com.checkmate.backend.global.util;

import com.checkmate.backend.global.exception.UnauthorizedException;
import com.checkmate.backend.global.response.ErrorStatus;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtUtil {

    private final SecretKey secretKey;

    @Getter private final long accessTokenValidityInMs;

    @Getter private final long refreshTokenValidityInMs;

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-token-validity}") long accessTokenValidityInMs,
            @Value("${jwt.refresh-token-validity}") long refreshTokenValidityInMs) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenValidityInMs = accessTokenValidityInMs;
        this.refreshTokenValidityInMs = refreshTokenValidityInMs;
    }

    public String generateAccessToken(Long memberId, Long storeId) {
        Date now = new Date();
        Date expiresAt = new Date(now.getTime() + accessTokenValidityInMs);

        JwtBuilder builder =
                Jwts.builder()
                        .header()
                        .type("JWT")
                        .and()
                        .subject(String.valueOf(memberId))
                        .issuedAt(now)
                        .expiration(expiresAt)
                        .signWith(secretKey);

        if (storeId != null) {
            builder.claim("storeId", storeId);
        }

        return builder.compact();
    }

    public String generateRefreshToken(Long memberId) {
        Date now = new Date();
        Date expiresAt = new Date(now.getTime() + refreshTokenValidityInMs);

        return Jwts.builder()
                .header()
                .type("JWT")
                .and()
                .subject(String.valueOf(memberId))
                .issuedAt(now)
                .expiration(expiresAt)
                .signWith(secretKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
            throw new UnauthorizedException(ErrorStatus.INVALID_JWT_SIGNATURE);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token: {}", e.getMessage());
            throw new UnauthorizedException(ErrorStatus.EXPIRED_JWT_TOKEN);
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token: {}", e.getMessage());
            throw new UnauthorizedException(ErrorStatus.UNSUPPORTED_JWT_TOKEN);
        } catch (IllegalArgumentException e) {
            log.error("JWT token is invalid: {}", e.getMessage());
            throw new UnauthorizedException(ErrorStatus.INVALID_JWT_TOKEN);
        }
    }

    private Jws<Claims> parseToken(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = parseToken(token).getPayload();
        return Long.parseLong(claims.getSubject());
    }
}
