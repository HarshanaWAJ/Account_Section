package com.cdrd.acc.backend.services.supplier;

import com.cdrd.acc.backend.entity.supplier.Supplier_Items;
import com.cdrd.acc.backend.repositories.supplier.SupplierItemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Supplier_ItemsService {

    @Autowired
    private SupplierItemsRepo supplierItemsRepo;

    public Supplier_Items addSupplierItems(Supplier_Items supplierItems) {
        try {
            return supplierItemsRepo.save(supplierItems);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
