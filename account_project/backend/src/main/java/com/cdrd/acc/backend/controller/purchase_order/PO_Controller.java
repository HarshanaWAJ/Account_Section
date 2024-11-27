package com.cdrd.acc.backend.controller.purchase_order;

import com.cdrd.acc.backend.entity.purchase_order.PO;
import com.cdrd.acc.backend.services.Demand.DemandService;
import com.cdrd.acc.backend.services.purchase_order.PO_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/purchase-order")
public class PO_Controller {

    @Autowired
    private PO_Service purchaseOrderService;
    private DemandService demandService;

    @GetMapping("/get/all-list")
    public ResponseEntity<List<PO>> getAllPurchaseOrders() {
        try {
            List<PO> purchaseOrderList = purchaseOrderService.getAllPurchaseOrders();
            return ResponseEntity.ok(purchaseOrderList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/add-purchase-order")
    public ResponseEntity<PO> addPurchaseOrder(@RequestBody PO purchaseOrder) {
        if (purchaseOrder == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Return 400 Bad Request if input is null
        }
        try {

            Optional<PO> savedPurchaseOrderOpt = purchaseOrderService.addPurchaseOrder(purchaseOrder);
            int demand_id =  purchaseOrder.getQuotationCall().getDemand().getId();
            if (savedPurchaseOrderOpt.isPresent()) {
                demandService.updateDemandStatus(demand_id, "Purchase Order Placed");
                return ResponseEntity.status(HttpStatus.CREATED).body(savedPurchaseOrderOpt.get()); // Return 201 Created
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Return 400 Bad Request if the order could not be saved
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }



    @PutMapping("/update-purchase-order/{id}")
    public ResponseEntity<PO> updatePurchaseOrder(@PathVariable Integer id, @RequestBody PO purchaseOrder) {
        try {
            Optional<PO> updatedPurchaseOrderOpt = purchaseOrderService.updatePurchaseOrder(id, purchaseOrder);

            if (updatedPurchaseOrderOpt.isPresent()) {
                return ResponseEntity.ok(updatedPurchaseOrderOpt.get()); // Return 200 OK with updated order
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if order not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 Internal Server Error
        }
    }

    @DeleteMapping("/delete-purchase-order/{id}")
    public ResponseEntity<String> deletePurchaseOrder(@PathVariable Integer id) {
        try {
            boolean deleted = purchaseOrderService.deletePurchaseOrder(id);

            if (deleted) {
                return ResponseEntity.ok("Purchase order deleted successfully."); // Return 200 OK
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Purchase order not found."); // Return 404 Not Found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the purchase order."); // Return 500 Internal Server Error
        }
    }

}
