package com.checkmate.backend.domain.member.dto;

public record MemberStatusResponse(String email, boolean hasStore, boolean hasPosIntegration) {}
