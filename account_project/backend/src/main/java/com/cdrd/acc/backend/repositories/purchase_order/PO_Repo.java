package com.cdrd.acc.backend.repositories.purchase_order;

import com.cdrd.acc.backend.entity.purchase_order.PO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PO_Repo extends JpaRepository<PO, Integer> {

    @Query("SELECT po FROM PO po WHERE po.poRef =?1")
    List<PO> getPurchaseOrderListByQCNo(String poNo);
}
