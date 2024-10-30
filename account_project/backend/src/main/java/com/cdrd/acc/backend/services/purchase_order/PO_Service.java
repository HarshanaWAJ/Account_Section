package com.cdrd.acc.backend.services.purchase_order;

import com.cdrd.acc.backend.entity.purchase_order.PO;
import com.cdrd.acc.backend.repositories.Demand.DemandRepo;
import com.cdrd.acc.backend.repositories.purchase_order.PO_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class PO_Service {

    @Autowired
    private PO_Repo poRepo;

    @Autowired
    private DemandRepo demandRepo;

    public List<PO> getAllPurchaseOrders() {
        try {
            return poRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public Optional<PO> addPurchaseOrder(PO purchaseOrder) {
        if (purchaseOrder == null || purchaseOrder.getQuotationCall() == null ||
                purchaseOrder.getQuotationCall().getDemand() == null) {
            throw new IllegalArgumentException("Invalid purchase order or related entities.");
        }

        try {
            PO savedPurchaseOrder = poRepo.save(purchaseOrder);
            demandRepo.updateStatusById("Purchase Order Placed",
                    purchaseOrder.getQuotationCall().getDemand().getId());
            return Optional.of(savedPurchaseOrder); // Return saved purchase order wrapped in Optional
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty(); // Return empty Optional in case of an error
        }
    }


    public Optional<PO> updatePurchaseOrder(Integer id, PO purchaseOrder) {
        try {
            Optional<PO> existPurchaseOrderOpt = poRepo.findById(id);
            if (existPurchaseOrderOpt.isPresent()) {
                PO existPurchaseOrder = existPurchaseOrderOpt.get();

                // Update fields of the existing purchase order with new values
                existPurchaseOrder.setPoRef(purchaseOrder.getPoRef());
                existPurchaseOrder.setQcNo(purchaseOrder.getQcNo());
                existPurchaseOrder.setPoDate(purchaseOrder.getPoDate());
                existPurchaseOrder.setWing(purchaseOrder.getWing());
                existPurchaseOrder.setProject(purchaseOrder.getProject());
                existPurchaseOrder.setPoValue(purchaseOrder.getPoValue());
                existPurchaseOrder.setSupplier(purchaseOrder.getSupplier());
                existPurchaseOrder.setItems(purchaseOrder.getItems());
                existPurchaseOrder.setDelivaryDate(purchaseOrder.getDelivaryDate());

                // Save the updated purchase order
                PO updatedPurchaseOrder = poRepo.save(existPurchaseOrder);
                return Optional.of(updatedPurchaseOrder);
            } else {
                return Optional.empty(); // Return an empty Optional if the purchase order does not exist
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty(); // Return an empty Optional in case of an error
        }
    }

    public boolean deletePurchaseOrder(Integer id) {
        try {
            Optional<PO> existingPurchaseOrder = poRepo.findById(id);
            if (existingPurchaseOrder.isPresent()) {
                poRepo.delete(existingPurchaseOrder.get());
                return true; // Deletion was successful
            } else {
                return false; // Purchase order not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Return false in case of an error
        }
    }

}
