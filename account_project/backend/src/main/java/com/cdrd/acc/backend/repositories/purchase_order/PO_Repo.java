package com.cdrd.acc.backend.repositories.purchase_order;

import com.cdrd.acc.backend.entity.purchase_order.PO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PO_Repo extends JpaRepository<PO, Integer> {
}
