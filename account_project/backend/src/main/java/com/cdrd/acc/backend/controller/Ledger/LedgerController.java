package com.cdrd.acc.backend.controller.Ledger;

import com.cdrd.acc.backend.entity.Ledger.Ledger;
import com.cdrd.acc.backend.services.Ledger.LedgerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ledgers")
public class LedgerController {

    @Autowired
    private LedgerService ledgerService;

    @PostMapping("/add")
    public ResponseEntity<Ledger> addLedger(@RequestBody Ledger ledger) {
        try {
            if (ledger == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400 Bad Request if input is null
            }

            Optional<Ledger> savedLedgerOpt = ledgerService.addLedger(ledger);
            if (savedLedgerOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.CREATED).body(savedLedgerOpt.get()); // 201 Created
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
        }
    }

    @PutMapping("/update-ledger/{id}")
    public ResponseEntity<Ledger> updateLedger(@PathVariable Integer id, @RequestBody Ledger ledger) {
        try {
            if (ledger == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400 Bad Request if input is null
            }

            Optional<Ledger> updatedLedgerOpt = ledgerService.updateLedger(id, ledger);
            if (updatedLedgerOpt.isPresent()) {
                return ResponseEntity.ok(updatedLedgerOpt.get()); // 200 OK
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
        }
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Ledger> getLedgerById(@PathVariable Integer id) {
        try {
            Optional<Ledger> ledgerOpt = ledgerService.getLedgerById(id);
            if (ledgerOpt.isPresent()) {
                return ResponseEntity.ok(ledgerOpt.get()); // 200 OK
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
        }
    }

    @GetMapping("/get-all-list")
    public ResponseEntity<List<Ledger>> getAllLedgers() {
        try {
            List<Ledger> ledgers = ledgerService.getAllLedgerList();
            return ResponseEntity.ok(ledgers); // 200 OK with list
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
        }
    }

    @DeleteMapping("delete-ledger/{id}")
    public ResponseEntity<String> deleteLedger(@PathVariable Integer id) {
        try {
            boolean deleted = ledgerService.deleteLedger(id);
            if (deleted) {
                return ResponseEntity.ok("Ledger deleted successfully."); // 200 OK
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ledger not found."); // 404 Not Found
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the ledger."); // 500 Internal Server Error
        }
    }
}
