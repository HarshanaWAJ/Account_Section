package com.cdrd.acc.backend.repositories.procurement;

import com.cdrd.acc.backend.entity.Procurment.Procurement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcurementRepo extends JpaRepository<Procurement, Integer> {
}
