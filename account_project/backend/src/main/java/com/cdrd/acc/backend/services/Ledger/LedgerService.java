package com.cdrd.acc.backend.services.Ledger;

import com.cdrd.acc.backend.entity.Ledger.Ledger;
import com.cdrd.acc.backend.repositories.Ledger.LedgerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LedgerService {

    @Autowired
    private LedgerRepo ledgerRepo;

    public List<Ledger> getAllLedgerList() {
        try  {
            return ledgerRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Optional<Ledger> addLedger(Ledger ledger) {
        try {
            Ledger savedLedger = ledgerRepo.save(ledger);
            return Optional.of(savedLedger);
        } catch (Exception e) {
            e.printStackTrace(); // Consider logging this instead of printing
            return Optional.empty();
        }
    }

    public Optional<Ledger> updateLedger(Integer id, Ledger ledger) {
        try {
            Optional<Ledger> existingLedgerOpt = ledgerRepo.findById(id);
            if (existingLedgerOpt.isPresent()) {
                Ledger existingLedger = existingLedgerOpt.get();
                existingLedger.setG35No(ledger.getG35No());
                existingLedger.setDate(ledger.getDate());
                existingLedger.setInvoiceNo(ledger.getInvoiceNo());
                existingLedger.setValue(ledger.getValue());
                existingLedger.setVoteNo(ledger.getVoteNo());
                existingLedger.setRemainBalance(ledger.getRemainBalance());
                existingLedger.setQciNo(ledger.getQciNo());

                Ledger updatedLedger = ledgerRepo.save(existingLedger);
                return Optional.of(updatedLedger);
            } else {
                return Optional.empty(); // Ledger not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public Optional<Ledger> getLedgerById(Integer id) {
        try {
            return ledgerRepo.findById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public boolean deleteLedger(Integer id) {
        try {
            if (ledgerRepo.existsById(id)) {
                ledgerRepo.deleteById(id);
                return true;
            } else {
                return false; // Ledger not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
