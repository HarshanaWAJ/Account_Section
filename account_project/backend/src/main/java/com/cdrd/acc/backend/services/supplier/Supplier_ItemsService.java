package com.cdrd.acc.backend.services.supplier;

import com.cdrd.acc.backend.entity.supplier.Supplier_Items;
import com.cdrd.acc.backend.repositories.supplier.SupplierItemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public List<Supplier_Items> getItemListBySupplierId(Integer supplierId) {
        try {
            List<Object[]> results = supplierItemsRepo.getSuppliersByProcurementsId(supplierId);
            List<Supplier_Items> supplierItems = new ArrayList<>();
            for (Object[] result : results) {
                String name = (String) result[0];
                Integer quantity = (Integer) result[1];
                Supplier_Items item = new Supplier_Items();
                item.setName(name);
                item.setQuantity(quantity);
                supplierItems.add(item);
            }
            return supplierItems;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
