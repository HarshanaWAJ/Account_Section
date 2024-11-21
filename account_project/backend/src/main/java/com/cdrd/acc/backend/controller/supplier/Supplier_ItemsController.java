package com.cdrd.acc.backend.controller.supplier;

import com.cdrd.acc.backend.entity.supplier.Supplier_Items;
import com.cdrd.acc.backend.services.supplier.Supplier_ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/supplier-items")
public class Supplier_ItemsController {

    @Autowired
    private Supplier_ItemsService supplierItemsService;

    @PostMapping("/add-supplier-items")
    public ResponseEntity<Supplier_Items> addSupplierItems(@RequestBody Supplier_Items supplierItems) {
        try {
            Supplier_Items addSupplierItem = supplierItemsService.addSupplierItems(supplierItems);
            return ResponseEntity.ok(addSupplierItem);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get-supplier-items-by-supplier-id")
    public ResponseEntity<List<Supplier_Items>> getSupplierItembsBySupplierId(@RequestParam Integer supplierId) {
        try {
            List<Supplier_Items> supplierItems = supplierItemsService.getItemListBySupplierId(supplierId);
            return ResponseEntity.ok(supplierItems);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
