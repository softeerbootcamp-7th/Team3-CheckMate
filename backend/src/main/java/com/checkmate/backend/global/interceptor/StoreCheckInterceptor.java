package com.checkmate.backend.global.interceptor;

import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.exception.ForbiddenException;
import com.checkmate.backend.global.response.ErrorStatus;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
public class StoreCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler) {
        MemberSession member = (MemberSession) request.getAttribute("loginMember");

        if (member == null || member.storeId() == null) {
            log.warn("Access Denied: No Store ID found for member");
            throw new ForbiddenException(ErrorStatus.STORE_NOT_REGISTERED);
        }

        return true;
    }
}
