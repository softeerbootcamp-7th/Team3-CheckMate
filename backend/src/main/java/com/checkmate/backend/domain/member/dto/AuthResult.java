package com.checkmate.backend.domain.member.dto;

import com.checkmate.backend.domain.member.entity.Member;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;

public record AuthResult(Member member, GoogleTokenResponse googleToken, boolean isNewMember) {}
