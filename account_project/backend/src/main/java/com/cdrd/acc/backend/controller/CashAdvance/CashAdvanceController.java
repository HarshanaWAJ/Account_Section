package com.cdrd.acc.backend.controller.CashAdvance;

import com.cdrd.acc.backend.entity.CashAdvance.CashAdvance;
import com.cdrd.acc.backend.services.CashAdvance.CashAdvanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cash-advance")
public class CashAdvanceController {

    @Autowired
    private CashAdvanceService cashAdvanceService;


    @GetMapping("/get-all-cash-advance")
    public ResponseEntity<List<CashAdvance>> getAllCashAdvance() {
        try {
            List<CashAdvance> cashAdvanceList = cashAdvanceService.getAllCashAdvance();
            return ResponseEntity.ok(cashAdvanceList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
