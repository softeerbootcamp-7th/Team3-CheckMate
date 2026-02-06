package com.checkmate.backend.global.auth;

import com.checkmate.backend.global.exception.UnauthorizedException;
import com.checkmate.backend.global.response.ErrorStatus;
import com.checkmate.backend.global.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) {
        try {
            String token = request.getHeader("Authorization");

            if (token != null && token.startsWith("Bearer ")) {
                String jwtToken = token.substring(7);
                Long memberId = jwtUtil.getMemberIdFromToken(jwtToken);
                Long storeId = jwtUtil.getStorerIdFromToken(jwtToken);

                MemberSession sessionDto = new MemberSession(memberId, storeId);
                request.setAttribute("loginMember", sessionDto);
            }

            filterChain.doFilter(request, response);

        } catch (UnauthorizedException ex) {
            handlerExceptionResolver.resolveException(request, response, null, ex);
        } catch (SecurityException | MalformedJwtException e) {
            handlerExceptionResolver.resolveException(
                    request, response, null,
                    new UnauthorizedException(ErrorStatus.INVALID_JWT_SIGNATURE));
        } catch (ExpiredJwtException e) {
            handlerExceptionResolver.resolveException(
                    request, response, null,
                    new UnauthorizedException(ErrorStatus.EXPIRED_JWT_TOKEN));
        } catch (UnsupportedJwtException e) {
            handlerExceptionResolver.resolveException(
                    request, response, null,
                    new UnauthorizedException(ErrorStatus.UNSUPPORTED_JWT_TOKEN));
        } catch (IllegalArgumentException e) {
            handlerExceptionResolver.resolveException(
                    request, response, null,
                    new UnauthorizedException(ErrorStatus.INVALID_JWT_TOKEN));
        } catch (Exception e) {
            handlerExceptionResolver.resolveException(
                    request, response, null,
                    new UnauthorizedException(ErrorStatus.UNAUTHORIZED_ACCESS));
        }
    }
}