package com.cdrd.acc.backend.services.supplier;

import com.cdrd.acc.backend.entity.supplier.Supplier;
import com.cdrd.acc.backend.repositories.supplier.SupplierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepo supplierRepo;

    public List<Supplier> getSupplierList() {
        try {
            return supplierRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public Supplier addSupplier(@RequestBody Supplier supplier) {
        try {
            Supplier savedSupplier = supplierRepo.save(supplier);
            return savedSupplier;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Supplier> updateSuppliers(List<Supplier> suppliers) {
        List<Supplier> updatedSuppliers = new ArrayList<>();
        for (Supplier supplier : suppliers) {
            Optional<Supplier> existingSupplierOpt = supplierRepo.findById(supplier.getId());
            if (existingSupplierOpt.isPresent()) {
                Supplier existingSupplier = existingSupplierOpt.get();
                existingSupplier.setSupplierName(supplier.getSupplierName());
                existingSupplier.setItems(supplier.getItems());
                existingSupplier.setProcurement(supplier.getProcurement());
                updatedSuppliers.add(supplierRepo.save(existingSupplier));
            }
        }
        return updatedSuppliers; // Return the list of updated suppliers
    }

    public boolean deleteSupplier(Integer id) {
        try {
            supplierRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Supplier> getSuppliersByProcurementsId(Integer id, String supplierName) {
        return supplierRepo.getSuppliersByProcurementsId(id, supplierName);
    }

}
