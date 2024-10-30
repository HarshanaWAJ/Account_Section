package com.cdrd.acc.backend.controller.procurement;

import com.cdrd.acc.backend.entity.Procurment.ProcurementBy_RPC;
import com.cdrd.acc.backend.services.procurement.ProcurementBy_RPC_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/procurement_rpc")
public class ProcurementBy_RPC_Controller {

    @Autowired
    private ProcurementBy_RPC_Service procurementByRPCService;

    @GetMapping
    public ResponseEntity<List<ProcurementBy_RPC>> getAllProcurements() {
        try {
            List<ProcurementBy_RPC> procurements = procurementByRPCService.getAllProcurements();
            return ResponseEntity.ok(procurements); // Return 200 OK with list
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProcurementBy_RPC> getProcurementById(@PathVariable Integer id) {
        try {
            return procurementByRPCService.getProcurementById(id)
                    .map(procurement -> ResponseEntity.ok(procurement)) // Return 200 OK
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // Return 404 Not Found
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }

    @PostMapping
    public ResponseEntity<ProcurementBy_RPC> createProcurement(@RequestBody ProcurementBy_RPC procurementByRPC) {
        try {
            ProcurementBy_RPC createdProcurement = procurementByRPCService.createProcurement(procurementByRPC);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProcurement); // Return 201 Created
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProcurementBy_RPC> updateProcurement(@PathVariable Integer id, @RequestBody ProcurementBy_RPC procurementByRPC) {
        try {
            ProcurementBy_RPC updatedProcurement = procurementByRPCService.updateProcurement(id, procurementByRPC);
            if (updatedProcurement != null) {
                return ResponseEntity.ok(updatedProcurement); // Return 200 OK
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProcurement(@PathVariable Integer id) {
        try {
            boolean deleted = procurementByRPCService.deleteProcurement(id);
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
