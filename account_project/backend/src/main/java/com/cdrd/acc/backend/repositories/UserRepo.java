package com.cdrd.acc.backend.repositories;

import com.cdrd.acc.backend.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<OurUsers, Long> {
    Optional<OurUsers> findByEmail(String email);

    
}
