package com.cdrd.acc.backend.repositories.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.AdvanceSettlement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvanceSettlemetRepo extends JpaRepository<AdvanceSettlement, Integer> {
}
