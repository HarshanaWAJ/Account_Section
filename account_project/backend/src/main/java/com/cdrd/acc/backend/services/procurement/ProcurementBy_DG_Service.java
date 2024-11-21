package com.cdrd.acc.backend.services.procurement;

import com.cdrd.acc.backend.entity.Procurment.ProcurementBy_DG;
import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.cdrd.acc.backend.repositories.Demand.DemandRepo;
import com.cdrd.acc.backend.repositories.Quotations.QuotationCallRepo;
import com.cdrd.acc.backend.repositories.procurement.ProcurementBy_DG_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProcurementBy_DG_Service {
    @Autowired
    private ProcurementBy_DG_Repo procurementByDGRepo; // Inject the repository

    @Autowired
    private DemandRepo demandRepo;

    @Autowired
    private QuotationCallRepo quotationCallRepo;


    public List<ProcurementBy_DG> getAllProcurements() {
        return procurementByDGRepo.findAll();
    }

    public Optional<ProcurementBy_DG> getProcurementById(Integer id) {
        return procurementByDGRepo.findById(id);
    }

    public ProcurementBy_DG createProcurement(ProcurementBy_DG procurementByDG) {
        try {
            // Ensure QuotationCall is not null
            if (procurementByDG.getQuotationCall() == null) {
                throw new RuntimeException("QuotationCall cannot be null");
            }

            QuotationCall quotationCall = procurementByDG.getQuotationCall();

            // Ensure the Demand is associated with the QuotationCall
            if (quotationCall.getDemand() == null) {
                // If Demand is not set, attempt to fetch the QuotationCall from the database
                if (quotationCall.getId() != null) {
                    quotationCall = quotationCallRepo.findById(quotationCall.getId())
                            .orElseThrow(() -> new RuntimeException("QuotationCall not found"));

                    // Recheck the Demand association after fetching
                    if (quotationCall.getDemand() == null) {
                        throw new RuntimeException("Demand cannot be null");
                    }
                } else {
                    throw new RuntimeException("Demand cannot be null");
                }
            }

            // Set the managed QuotationCall in Procurement
            procurementByDG.setQuotationCall(quotationCall);

            // Update the status of the associated Demand
            demandRepo.updateStatusById("Procurement Committed", quotationCall.getDemand().getId());
            return procurementByDGRepo.save(procurementByDG);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public ProcurementBy_DG updateProcurement(Integer id, ProcurementBy_DG procurementByDG) {
        if (procurementByDGRepo.existsById(id)) {
            procurementByDG.setId(id); // Ensure the ID is set for update
            return procurementByDGRepo.save(procurementByDG);
        }
        return null; // Or throw an exception
    }

    public boolean deleteProcurement(Integer id) {
        if (procurementByDGRepo.existsById(id)) {
            procurementByDGRepo.deleteById(id);
            return true;
        }
        return false; // Not found
    }
}
