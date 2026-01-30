package com.checkmate.backend.domain.member.entity;

import com.checkmate.backend.domain.store.entity.Store;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private Store store;

    @Builder
    public Member(String email) {
        this.email = email;
    }
}
