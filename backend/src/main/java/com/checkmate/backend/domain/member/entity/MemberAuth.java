package com.checkmate.backend.domain.member.entity;

import com.checkmate.backend.global.converter.StringEncryptionConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(
        name = "member_auth",
        indexes = {@Index(name = "idx_member_auth_member_id", columnList = "member_id")})
public class MemberAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_auth_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = StringEncryptionConverter.class)
    private String googleAccessToken;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = StringEncryptionConverter.class)
    private String googleRefreshToken;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = StringEncryptionConverter.class)
    private String refreshToken;

    public void updateGoogleTokens(String accessToken, String refreshToken) {
        this.googleAccessToken = accessToken;
        if (refreshToken != null) {
            this.googleRefreshToken = refreshToken;
        }
    }

    public void updateRefreshToken(String ourRefreshToken) {
        this.refreshToken = ourRefreshToken;
    }

    // 정적 팩토리 메서드 사용
    public static MemberAuth createWithMember(Member member) {
        MemberAuth memberAuth = new MemberAuth();
        memberAuth.member = member;
        return memberAuth;
    }
}
