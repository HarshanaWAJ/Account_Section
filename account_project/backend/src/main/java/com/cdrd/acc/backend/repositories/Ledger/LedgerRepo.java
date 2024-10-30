package com.cdrd.acc.backend.repositories.Ledger;

import com.cdrd.acc.backend.entity.Ledger.Ledger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LedgerRepo extends JpaRepository<Ledger, Integer> {
}
