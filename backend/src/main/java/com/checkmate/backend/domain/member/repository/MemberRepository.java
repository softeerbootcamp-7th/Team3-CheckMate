package com.checkmate.backend.domain.member.repository;

import com.checkmate.backend.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    @Query("select m from Member m join fetch m.store where m.id = :id")
    Optional<Member> findByIdWithStore(@Param("id") Long id);
}
