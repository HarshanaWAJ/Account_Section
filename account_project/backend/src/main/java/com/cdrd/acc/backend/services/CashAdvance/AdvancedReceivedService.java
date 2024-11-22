package com.cdrd.acc.backend.services.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.AdvanceReceived;
import com.cdrd.acc.backend.repositories.CashAdvance.AdvanceReceivedRepo;
import com.cdrd.acc.backend.repositories.CashAdvance.CashAdvanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdvancedReceivedService {

    @Autowired
    private AdvanceReceivedRepo advanceReceivedRepo;

    @Autowired
    private CashAdvanceRepo cashAdvanceRepo;

    // Create a new AdvanceReceived
    public AdvanceReceived createAdvanceReceived(AdvanceReceived advanceReceived) {
        try {
            cashAdvanceRepo.updateStatusBySerialNo(advanceReceived.getSerialNo(), "advanced received");
            return advanceReceivedRepo.save(advanceReceived);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Get all AdvanceReceived records
    public List<AdvanceReceived> getAllAdvanceReceived() {
        try {
            return advanceReceivedRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Get AdvanceReceived by ID
    public AdvanceReceived getAdvanceReceivedById(int id) {
        try {
            return advanceReceivedRepo.findById(id).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Update an existing AdvanceReceived record
    public AdvanceReceived updateAdvanceReceived(int id, AdvanceReceived updatedAdvanceReceived) {
        try {
            if (advanceReceivedRepo.existsById(id)) {
                updatedAdvanceReceived.setId(id); // Ensure ID is set before saving
                return advanceReceivedRepo.save(updatedAdvanceReceived);
            } else {
                return null; // Entity not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Delete an AdvanceReceived by ID
    public boolean deleteAdvanceReceived(int id) {
        try {
            if (advanceReceivedRepo.existsById(id)) {
                advanceReceivedRepo.deleteById(id);
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
