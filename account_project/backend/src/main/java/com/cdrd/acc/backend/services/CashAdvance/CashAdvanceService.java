package com.cdrd.acc.backend.services.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.CashAdvance;
import com.cdrd.acc.backend.repositories.CashAdvance.CashAdvanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CashAdvanceService {

    @Autowired
    private CashAdvanceRepo cashAdvanceRepo;

    public List<CashAdvance> getAllCashAdvance() {
        try {
            return cashAdvanceRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public CashAdvance createCashAdvance(CashAdvance cashAdvance) {
        try {
            cashAdvanceRepo.updateStatusBySerialNo(cashAdvance.getSerialNo(), "on progress");
            return cashAdvanceRepo.save(cashAdvance);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public CashAdvance getCashAdvanceById(Integer id) {
        try {
            return cashAdvanceRepo.findById(id).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public CashAdvance updateCashAdvance(Integer id, CashAdvance updatedCashAdvance) {
        try {
            if (cashAdvanceRepo.existsById(id)) {
                updatedCashAdvance.setId(id); // Ensure the ID is maintained
                return cashAdvanceRepo.save(updatedCashAdvance);
            } else {
                return null; // Entity not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean deleteCashAdvance(Integer id) {
        try {
            if (cashAdvanceRepo.existsById(id)) {
                cashAdvanceRepo.deleteById(id);
                return true; // Successfully deleted
            } else {
                return false; // Entity not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updateCashAdvanceStatus(String serialNo, String status) {
        // Calling the repository method to update the status based on serialNo
        int rowsAffected = cashAdvanceRepo.updateStatusBySerialNo(serialNo, status);
        // Return true if at least one record was updated, false if no records were affected.
        return rowsAffected > 0;
    }

}
