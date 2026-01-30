package com.checkmate.backend.domain.member.repository;

import com.checkmate.backend.domain.member.entity.Member;
import com.checkmate.backend.domain.member.entity.MemberAuth;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberAuthRepository extends JpaRepository<MemberAuth, Long> {
    Optional<MemberAuth> findByMember(Member member);
}
