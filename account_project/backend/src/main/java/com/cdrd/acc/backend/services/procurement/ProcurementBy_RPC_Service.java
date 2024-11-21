package com.cdrd.acc.backend.services.procurement;

import com.cdrd.acc.backend.entity.Procurment.ProcurementBy_RPC;
import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.cdrd.acc.backend.repositories.Demand.DemandRepo;
import com.cdrd.acc.backend.repositories.Quotations.QuotationCallRepo;
import com.cdrd.acc.backend.repositories.procurement.ProcurementBy_RPC_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProcurementBy_RPC_Service {
    @Autowired
    private ProcurementBy_RPC_Repo procurementByRPCRepo; // Inject the repository

    @Autowired
    private DemandRepo demandRepo;

    @Autowired
    private QuotationCallRepo quotationCallRepo;

    public List<ProcurementBy_RPC> getAllProcurements() {
        return procurementByRPCRepo.findAll();
    }

    public Optional<ProcurementBy_RPC> getProcurementById(Integer id) {
        return procurementByRPCRepo.findById(id);
    }

    public ProcurementBy_RPC createProcurement(ProcurementBy_RPC procurementByRPC) {
        try {
            if (procurementByRPC.getQuotationCall() == null) {
                throw new RuntimeException("QuotationCall cannot be null");
            }

            QuotationCall quotationCall = procurementByRPC.getQuotationCall();

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
            procurementByRPC.setQuotationCall(quotationCall);

            // Update the status of the associated Demand
            demandRepo.updateStatusById("Procurement Committed", quotationCall.getDemand().getId());

            return procurementByRPCRepo.save(procurementByRPC);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public ProcurementBy_RPC updateProcurement(Integer id, ProcurementBy_RPC procurementByRPC) {
        if (procurementByRPCRepo.existsById(id)) {
            procurementByRPC.setId(id); // Ensure the ID is set for update
            return procurementByRPCRepo.save(procurementByRPC);
        }
        return null; // Or throw an exception
    }

    public boolean deleteProcurement(Integer id) {
        if (procurementByRPCRepo.existsById(id)) {
            procurementByRPCRepo.deleteById(id);
            return true;
        }
        return false; // Not found
    }
}
