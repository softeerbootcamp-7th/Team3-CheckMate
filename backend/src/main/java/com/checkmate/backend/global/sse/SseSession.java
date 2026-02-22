package com.checkmate.backend.global.sse;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public record SseSession(String emitterId, SseEmitter emitter) {}
