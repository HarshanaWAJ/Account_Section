package com.cdrd.acc.backend.controller.PettyCash;

import com.cdrd.acc.backend.entity.PettyCash.PettyCash;
import com.cdrd.acc.backend.services.PettyCash.PettyCashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/petty-cash")
public class PettyCashController {

    @Autowired
    private PettyCashService pettyCashService;

    // Create a new PettyCash entry
    @PostMapping("/create")
    public ResponseEntity<PettyCash> createPettyCash(@RequestBody PettyCash pettyCash) {
        try {
            PettyCash createdPettyCash = pettyCashService.createPettyCash(pettyCash);
            if (createdPettyCash != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdPettyCash);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get all PettyCash records
    @GetMapping("/get-all")
    public ResponseEntity<List<PettyCash>> getAllPettyCash() {
        try {
            List<PettyCash> pettyCashList = pettyCashService.getAllPettyCash();
            if (pettyCashList != null && !pettyCashList.isEmpty()) {
                return ResponseEntity.ok(pettyCashList);
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null); // No records found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get a PettyCash record by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<PettyCash> getPettyCashById(@PathVariable int id) {
        try {
            PettyCash pettyCash = pettyCashService.getPettyCashById(id);
            if (pettyCash != null) {
                return ResponseEntity.ok(pettyCash);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update an existing PettyCash record
    @PutMapping("/update/{id}")
    public ResponseEntity<PettyCash> updatePettyCash(@PathVariable int id, @RequestBody PettyCash updatedPettyCash) {
        try {
            PettyCash updated = pettyCashService.updatePettyCash(id, updatedPettyCash);
            if (updated != null) {
                return ResponseEntity.ok(updated); // Return updated object
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete a PettyCash record by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePettyCash(@PathVariable int id) {
        try {
            boolean isDeleted = pettyCashService.deletePettyCash(id);
            if (isDeleted) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Petty Cash record deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Petty Cash record not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting the record.");
        }
    }
}
