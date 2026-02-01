package com.checkmate.backend.global.util;

import com.checkmate.backend.global.response.ErrorStatus;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class BusinessJwtUtil extends AbstractJwtUtil {
    private final long tokenValidityInMs;
    private static final String CLAIM_BIZ_REG_NO = "bizRegNo";
    private static final String SUBJECT = "BUSINESS_AUTH";

    public BusinessJwtUtil(
            @Value("${business.jwt.key}") String secret,
            @Value("${business.jwt.expiration}") long tokenValidityInMs) {
        super(secret);
        this.tokenValidityInMs = tokenValidityInMs;
    }

    /** 사업자 인증 성공 시 발급되는 토큰 */
    public String generateBizAuthToken(String businessRegistrationNumber) {
        Date now = new Date();

        Date expiresAt = new Date(now.getTime() + tokenValidityInMs);

        return Jwts.builder()
                .header()
                .type("JWT")
                .and()
                .subject(SUBJECT)
                .claim(CLAIM_BIZ_REG_NO, businessRegistrationNumber)
                .issuedAt(now)
                .expiration(expiresAt)
                .signWith(secretKey)
                .compact();
    }

    /** 사업자 인증 토큰 검증 */
    public void validateBusinessAuthToken(String token) {
        validateToken(
                token,
                ErrorStatus.EXPIRED_BUSINESS_AUTH_TOKEN,
                ErrorStatus.INVALID_BUSINESS_AUTH_TOKEN);
    }

    /** 토큰에서 사업자등록번호 추출 */
    public String getBusinessRegistrationNumberFromToken(String token) {
        Claims claims = parseToken(token).getPayload();
        return claims.get(CLAIM_BIZ_REG_NO, String.class);
    }
}
