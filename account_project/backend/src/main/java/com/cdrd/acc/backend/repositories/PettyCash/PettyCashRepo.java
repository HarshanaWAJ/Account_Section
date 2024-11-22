package com.cdrd.acc.backend.repositories.PettyCash;

import com.cdrd.acc.backend.entity.PettyCash.PettyCash;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PettyCashRepo extends JpaRepository<PettyCash, Integer> {
}
