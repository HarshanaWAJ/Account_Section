package com.cdrd.acc.backend.repositories.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.CashAdvance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface CashAdvanceRepo extends JpaRepository<CashAdvance, Integer> {
    // Custom update query to update the status based on serialNo
    @Modifying
    @Transactional
    @Query("UPDATE CashAdvance ca SET ca.status = :status WHERE ca.serialNo = :serialNo")
    int updateStatusBySerialNo(String serialNo, String status);
}
