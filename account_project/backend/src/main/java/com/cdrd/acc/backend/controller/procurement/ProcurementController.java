package com.cdrd.acc.backend.controller.procurement;

import com.cdrd.acc.backend.dto.ProcurementDTO;
import com.cdrd.acc.backend.entity.Procurment.Procurement;
import com.cdrd.acc.backend.services.procurement.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/procurement-mpc")
public class ProcurementController {

    @Autowired
    ProcurementService procurementService;

    // Get All procurements

    @GetMapping("/get-all")
    public ResponseEntity<List<Procurement>> getAllProcurement() {
        try {
            List<Procurement> procurementList = procurementService.getProcurementList();
            return ResponseEntity.ok(procurementList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Find By Id
    @GetMapping("/get-procurement/{id}")
    public ResponseEntity<Procurement> getProcurementById(@PathVariable Integer id) {
        try {
            Procurement procurement = procurementService.findById(id);
            return procurement != null
                    ? ResponseEntity.ok(procurement) // Returns 200 OK with the demand
                    : ResponseEntity.notFound().build(); // Returns 404 Not Found if not found
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Add procurement
    @PostMapping("/add-procurement")
    public ResponseEntity<Procurement> createProcurement(@RequestBody Procurement procurement) {
        try {
            Procurement createdProcurement = procurementService.addProcurement(procurement);
            return ResponseEntity.status(201).body(createdProcurement); // Returns 201 Created with the created demand
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update
    @PutMapping("/update-procurement/{id}")
    public ResponseEntity<Procurement> updateProcurement(@PathVariable Integer id, @RequestBody Procurement procurement) {
        try {
            // Check if the demand with the given ID exists
            if (!procurementService.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            procurement.setId(id);  // Ensure the ID is set
            Procurement updatedProcurement = procurementService.updateProcurement(procurement);
            return ResponseEntity.ok(updatedProcurement); // Returns 200 OK with the updated demand
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //Delete
    @DeleteMapping("/delete-procurement/{id}")
    public ResponseEntity<Void> deleteProcurement(@PathVariable Integer id) {
        try {
            procurementService.deleteProcurement(id);
            return ResponseEntity.noContent().build(); // Returns 204 No Content on successful deletion
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/recall-procurement/{procurementId}")
    public ResponseEntity<?> recallProcurement(@PathVariable Integer procurementId) {
        try {
            Procurement recalledProcurement = procurementService.recallProcurement(procurementId);

            if (recalledProcurement == null) {
                return ResponseEntity.notFound().build(); // Return 404 if not found
            }
            return ResponseEntity.ok(recalledProcurement); // Return 200 with the recalled procurement details
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(e.getMessage()); // Return 404 on Procurement not found
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while recalling the procurement."); // Return 500 on error
        }
    }
}
