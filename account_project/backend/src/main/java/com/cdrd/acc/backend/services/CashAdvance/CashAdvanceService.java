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
}
