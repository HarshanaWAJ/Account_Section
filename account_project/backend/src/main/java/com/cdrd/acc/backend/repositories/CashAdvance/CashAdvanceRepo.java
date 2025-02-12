package com.cdrd.acc.backend.repositories.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.CashAdvance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CashAdvanceRepo extends JpaRepository<CashAdvance, Integer> {
    // Custom update query to update the status based on serialNo
    @Modifying
    @Transactional
    @Query("UPDATE CashAdvance ca SET ca.status = :status WHERE ca.serialNo = :serialNo")
    int updateStatusBySerialNo(String serialNo, String status);

    @Query("SELECT ca FROM CashAdvance ca WHERE ca.serialNo = :serialNo")
    List<CashAdvance> getCashAdvanceBySerialNo(String serialNo);

}
