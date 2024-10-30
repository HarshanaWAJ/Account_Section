package com.cdrd.acc.backend.controller.supplier;

import com.cdrd.acc.backend.entity.supplier.Supplier;
import com.cdrd.acc.backend.services.supplier.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/suppliers") // Correct the mapping to /suppliers
public class SupplierController {

    @Autowired
    private SupplierService supplierService; // Use SupplierService instead of SupplierRepo

    @PostMapping("/add-supplier")
    public ResponseEntity<List<Supplier>> addSuppliers(@RequestBody List<Supplier> suppliers) {
        List<Supplier> savedSuppliers = new ArrayList<>();

        for (Supplier supplier : suppliers) {
            try {
                Supplier savedSupplier = supplierService.addSupplier(supplier); // Use service for adding
                savedSuppliers.add(savedSupplier);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList()); // Error response
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSuppliers); // Return the list of saved suppliers
    }

    @GetMapping
    public ResponseEntity<List<Supplier>> getSupplierList() {
        try {
            List<Supplier> suppliers = supplierService.getSupplierList(); // Use service for getting suppliers
            return ResponseEntity.ok(suppliers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList()); // Error response
        }
    }

    @PutMapping
    public ResponseEntity<List<Supplier>> updateSuppliers(@RequestBody List<Supplier> suppliers) {
        try {
            List<Supplier> updatedSuppliers = supplierService.updateSuppliers(suppliers); // Use service for updating suppliers
            return ResponseEntity.ok(updatedSuppliers); // Return updated suppliers
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList()); // Error response
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable Integer id) {
        try {
            boolean deleted = supplierService.deleteSupplier(id);
            if (deleted) {
                return ResponseEntity.ok("Supplier deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Supplier not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting supplier.");
        }
    }

    @GetMapping("/procurements/{id}")
    public ResponseEntity<List<Supplier>> getSuppliersByProcurementsId(@PathVariable Integer id, @RequestBody String supplierName) {
        List<Supplier> suppliers = supplierService.getSuppliersByProcurementsId(id, supplierName);
        if (suppliers.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 Not Found if no suppliers found
        }
        return ResponseEntity.ok(suppliers); // 200 OK with the list of suppliers
    }
}
