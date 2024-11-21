package com.cdrd.acc.backend.repositories.supplier;

import com.cdrd.acc.backend.entity.supplier.Supplier;
import com.cdrd.acc.backend.entity.supplier.Supplier_Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplierItemsRepo extends JpaRepository<Supplier_Items, Integer> {

    @Query("SELECT si.name, si.quantity from Supplier_Items si WHERE si.supplier.id =?1")
    List<Object[]> getSuppliersByProcurementsId(Integer SupplierId);
}
