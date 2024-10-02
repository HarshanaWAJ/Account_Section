package com.example.server.repositories;

import com.example.server.entities.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<OurUsers, Integer> {
    Optional<OurUsers>findByRegID(String regId);
}
