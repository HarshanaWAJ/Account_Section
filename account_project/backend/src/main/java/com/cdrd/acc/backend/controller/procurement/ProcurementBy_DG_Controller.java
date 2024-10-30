package com.cdrd.acc.backend.controller.procurement;

import com.cdrd.acc.backend.entity.Procurment.ProcurementBy_DG;
import com.cdrd.acc.backend.services.procurement.ProcurementBy_DG_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procurements-dg")
public class ProcurementBy_DG_Controller {

    @Autowired
    private ProcurementBy_DG_Service procurementByDGService;

    @GetMapping("/get-all")
    public ResponseEntity<List<ProcurementBy_DG>> getAllProcurements() {
        try {
            List<ProcurementBy_DG> procurements = procurementByDGService.getAllProcurements();
            return ResponseEntity.ok(procurements); // Return 200 OK with list
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<ProcurementBy_DG> getProcurementById(@PathVariable Integer id) {
        try {
            return procurementByDGService.getProcurementById(id)
                    .map(procurement -> ResponseEntity.ok(procurement)) // Return 200 OK
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // Return 404 Not Found
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ProcurementBy_DG> createProcurement(@RequestBody ProcurementBy_DG procurementByDG) {
        try {
            ProcurementBy_DG createdProcurement = procurementByDGService.createProcurement(procurementByDG);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProcurement); // Return 201 Created
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }

    @PutMapping("/update-by-id/{id}")
    public ResponseEntity<ProcurementBy_DG> updateProcurement(@PathVariable Integer id, @RequestBody ProcurementBy_DG procurementByDG) {
        try {
            ProcurementBy_DG updatedProcurement = procurementByDGService.updateProcurement(id, procurementByDG);
            if (updatedProcurement != null) {
                return ResponseEntity.ok(updatedProcurement); // Return 200 OK
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }

    @DeleteMapping("/delete-by-id/{id}")
    public ResponseEntity<String> deleteProcurement(@PathVariable Integer id) {
        try {
            boolean deleted = procurementByDGService.deleteProcurement(id);
            if (deleted) {
                return ResponseEntity.ok("Procurement deleted successfully."); // Return 200 OK
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Procurement not found."); // Return 404 Not Found
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the procurement."); // Return 500 Internal Server Error
        }
    }
}
