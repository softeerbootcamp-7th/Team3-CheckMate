package com.checkmate.backend.domain.member.repository;

import com.checkmate.backend.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    @Query("SELECT m FROM Member m LEFT JOIN FETCH m.store WHERE m.email = :email")
    Optional<Member> findWithStoreByEmail(@Param("email") String email);

    @Query("SELECT m FROM Member m LEFT JOIN FETCH m.store WHERE m.id = :id")
    Optional<Member> findWithStoreById(@Param("id") Long id);
}
