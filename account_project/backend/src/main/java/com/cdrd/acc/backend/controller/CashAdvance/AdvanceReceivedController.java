package com.cdrd.acc.backend.controller.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.AdvanceReceived;
import com.cdrd.acc.backend.services.CashAdvance.AdvancedReceivedService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advance-received")
public class AdvanceReceivedController {

    private AdvancedReceivedService advancedReceivedService;

    @GetMapping("/get-all-cash-advance")
    public ResponseEntity<List<AdvanceReceived>> getAllCashAdvance() {
        try {
            List<AdvanceReceived> cashAdvanceList = advancedReceivedService.getAllAdvanceReceived();
            return ResponseEntity.ok(cashAdvanceList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Create a new AdvanceReceived record
    @PostMapping("/create-advance-received")
    public ResponseEntity<AdvanceReceived> createAdvanceReceived(@RequestBody AdvanceReceived advanceReceived) {
        try {
            AdvanceReceived createdAdvanceReceived = advancedReceivedService.createAdvanceReceived(advanceReceived);
            if (createdAdvanceReceived != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdAdvanceReceived);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get AdvanceReceived by ID
    @GetMapping("/get-advance-received/{id}")
    public ResponseEntity<AdvanceReceived> getAdvanceReceivedById(@PathVariable int id) {
        try {
            AdvanceReceived advanceReceived = advancedReceivedService.getAdvanceReceivedById(id);
            if (advanceReceived != null) {
                return ResponseEntity.ok(advanceReceived);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update an existing AdvanceReceived record
    @PutMapping("/update-advance-received/{id}")
    public ResponseEntity<AdvanceReceived> updateAdvanceReceived(@PathVariable int id, @RequestBody AdvanceReceived updatedAdvanceReceived) {
        try {
            AdvanceReceived advanceReceived = advancedReceivedService.updateAdvanceReceived(id, updatedAdvanceReceived);
            if (advanceReceived != null) {
                return ResponseEntity.ok(advanceReceived);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete an AdvanceReceived record by ID
    @DeleteMapping("/delete-advance-received/{id}")
    public ResponseEntity<Void> deleteAdvanceReceived(@PathVariable int id) {
        try {
            boolean isDeleted = advancedReceivedService.deleteAdvanceReceived(id);
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
