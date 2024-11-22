package com.cdrd.acc.backend.controller.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.CashAdvance;
import com.cdrd.acc.backend.services.CashAdvance.CashAdvanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cash-advance")
public class CashAdvanceController {

    @Autowired
    private CashAdvanceService cashAdvanceService;


    @GetMapping("/get-all-cash-advance")
    public ResponseEntity<List<CashAdvance>> getAllCashAdvance() {
        try {
            List<CashAdvance> cashAdvanceList = cashAdvanceService.getAllCashAdvance();
            return ResponseEntity.ok(cashAdvanceList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Create a new Cash Advance
    @PostMapping("/create-cash-advance")
    public ResponseEntity<CashAdvance> createCashAdvance(@RequestBody CashAdvance cashAdvance) {
        try {
            CashAdvance createdCashAdvance = cashAdvanceService.createCashAdvance(cashAdvance);
            if (createdCashAdvance != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdCashAdvance);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get Cash Advance by ID
    @GetMapping("/get-cash-advance/{id}")
    public ResponseEntity<CashAdvance> getCashAdvanceById(@PathVariable Integer id) {
        try {
            CashAdvance cashAdvance = cashAdvanceService.getCashAdvanceById(id);
            if (cashAdvance != null) {
                return ResponseEntity.ok(cashAdvance);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update an existing Cash Advance
    @PutMapping("/update-cash-advance/{id}")
    public ResponseEntity<CashAdvance> updateCashAdvance(@PathVariable Integer id, @RequestBody CashAdvance updatedCashAdvance) {
        try {
            CashAdvance cashAdvance = cashAdvanceService.updateCashAdvance(id, updatedCashAdvance);
            if (cashAdvance != null) {
                return ResponseEntity.ok(cashAdvance);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete a Cash Advance by ID
    @DeleteMapping("/delete-cash-advance/{id}")
    public ResponseEntity<Void> deleteCashAdvance(@PathVariable Integer id) {
        try {
            boolean isDeleted = cashAdvanceService.deleteCashAdvance(id);
            if (isDeleted) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
