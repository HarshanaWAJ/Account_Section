package com.cdrd.acc.backend.repositories.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.AdvanceReceived;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvanceReceivedRepo extends JpaRepository<AdvanceReceived, Integer> {
}
