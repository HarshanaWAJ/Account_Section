package com.cdrd.acc.backend.services.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.AdvanceReceived;
import com.cdrd.acc.backend.entity.CashAdvance.AdvanceSettlement;
import com.cdrd.acc.backend.repositories.CashAdvance.AdvanceSettlemetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdvanceSettlementService {

    @Autowired
    private AdvanceSettlemetRepo advanceSettlemetRepo;

    // Create a new AdvanceReceived
    public AdvanceSettlement createAdvanceReceived(AdvanceSettlement advanceSettlement) {
        try {
            return advanceSettlemetRepo.save(advanceSettlement);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Get all AdvanceSettlement records
    public List<AdvanceSettlement> getAllAdvanceSettlements() {
        try {
            return advanceSettlemetRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Get AdvanceSettlement by ID
    public AdvanceSettlement getAdvanceSettlementById(int id) {
        try {
            Optional<AdvanceSettlement> advanceSettlement = advanceSettlemetRepo.findById(id);
            return advanceSettlement.orElse(null); // Return null if not found
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Update an existing AdvanceSettlement record
    public AdvanceSettlement updateAdvanceSettlement(int id, AdvanceSettlement updatedAdvanceSettlement) {
        try {
            if (advanceSettlemetRepo.existsById(id)) {
                updatedAdvanceSettlement.setId(id); // Ensure the ID is maintained
                return advanceSettlemetRepo.save(updatedAdvanceSettlement);
            } else {
                return null; // Entity not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Delete an AdvanceSettlement by ID
    public boolean deleteAdvanceSettlement(int id) {
        try {
            if (advanceSettlemetRepo.existsById(id)) {
                advanceSettlemetRepo.deleteById(id);
                return true; // Successfully deleted
            } else {
                return false; // Entity not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
