package com.cdrd.acc.backend.controller.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.AdvanceReceived;
import com.cdrd.acc.backend.entity.CashAdvance.AdvanceSettlement;
import com.cdrd.acc.backend.services.CashAdvance.AdvanceSettlementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advance-settlement")
public class AdvanceSettlementController {

    @Autowired
    private AdvanceSettlementService advanceSettlementService;

    @GetMapping("/get-all-cash-advance")
    public ResponseEntity<List<AdvanceSettlement>> getAllCashAdvance() {
        try {
            List<AdvanceSettlement> advanceSettlementList = advanceSettlementService.getAllAdvanceSettlements();
            return ResponseEntity.ok(advanceSettlementList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get AdvanceSettlement by ID
    @GetMapping("/get-advance-settlement/{id}")
    public ResponseEntity<AdvanceSettlement> getAdvanceSettlementById(@PathVariable int id) {
        try {
            AdvanceSettlement advanceSettlement = advanceSettlementService.getAdvanceSettlementById(id);
            if (advanceSettlement != null) {
                return ResponseEntity.ok(advanceSettlement);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Create a new AdvanceSettlement record
    @PostMapping("/create-advance-settlement")
    public ResponseEntity<AdvanceSettlement> createAdvanceSettlement(@RequestBody AdvanceSettlement advanceSettlement) {
        try {
            AdvanceSettlement createdAdvanceSettlement = advanceSettlementService.createAdvanceReceived(advanceSettlement);
            if (createdAdvanceSettlement != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdAdvanceSettlement);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update an existing AdvanceSettlement record
    @PutMapping("/update-advance-settlement/{id}")
    public ResponseEntity<AdvanceSettlement> updateAdvanceSettlement(@PathVariable int id, @RequestBody AdvanceSettlement updatedAdvanceSettlement) {
        try {
            AdvanceSettlement advanceSettlement = advanceSettlementService.updateAdvanceSettlement(id, updatedAdvanceSettlement);
            if (advanceSettlement != null) {
                return ResponseEntity.ok(advanceSettlement);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete an AdvanceSettlement record by ID
    @DeleteMapping("/delete-advance-settlement/{id}")
    public ResponseEntity<Void> deleteAdvanceSettlement(@PathVariable int id) {
        try {
            boolean isDeleted = advanceSettlementService.deleteAdvanceSettlement(id);
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
