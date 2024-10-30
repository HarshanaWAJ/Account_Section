package com.cdrd.acc.backend.repositories.supplier;

import com.cdrd.acc.backend.entity.supplier.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SupplierRepo extends JpaRepository<Supplier, Integer> {

    @Query("SELECT s FROM Supplier s WHERE s.procurement.id = ?1 AND s.SupplierName = ?2")
    List<Supplier> getSuppliersByProcurementsId(Integer id, String supplierName);

}
