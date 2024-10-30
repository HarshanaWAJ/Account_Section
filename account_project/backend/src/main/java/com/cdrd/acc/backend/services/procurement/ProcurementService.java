package com.cdrd.acc.backend.services.procurement;

import com.cdrd.acc.backend.entity.Demand.Demand;
import com.cdrd.acc.backend.entity.Procurment.Procurement;
import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.cdrd.acc.backend.repositories.Demand.DemandRepo;
import com.cdrd.acc.backend.repositories.Quotations.QuotationCallRepo;
import com.cdrd.acc.backend.repositories.procurement.ProcurementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProcurementService {
    @Autowired
    private ProcurementRepo procurementRepo;

    @Autowired
    private DemandRepo demandRepo;

    @Autowired
    private QuotationCallRepo quotationCallRepo;
    // Get All Procurement
    public List<Procurement> getProcurementList() {
        try {
            return procurementRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Add procurement
    @Transactional
    public Procurement addProcurement(Procurement procurement) {
        try {
            // Ensure QuotationCall is not null
            if (procurement.getQuotationCall() == null) {
                throw new RuntimeException("QuotationCall cannot be null");
            }

            QuotationCall quotationCall = procurement.getQuotationCall();

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
            procurement.setQuotationCall(quotationCall);

            // Save the Procurement
            Procurement savedProcurement = procurementRepo.save(procurement);

            // Update the status of the associated Demand
            demandRepo.updateStatusById("Procurement Committed", quotationCall.getDemand().getId());

            return savedProcurement;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }



    // Update procurement
    public Procurement updateProcurement(Procurement procurement) {
        try {
            if (procurement.getId() != null && procurementRepo.existsById(procurement.getId())) {
                // If the ID exists, perform an update.
                return procurementRepo.save(procurement);
            } else {
                throw new IllegalArgumentException("Procurement ID must be provided for updating.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Delete procurement
    public void deleteProcurement(Integer id) {
        try {
            procurementRepo.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
    }

    public Procurement findById(Integer id) {
        return procurementRepo.findById(id).orElse(null);
    }

    public boolean existsById(Integer id) {
        try {
            return procurementRepo.existsById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public Procurement recallProcurement(Integer procurementId) {
        try {
            // Fetch the Procurement by ID
            Procurement procurement = procurementRepo.findById(procurementId)
                    .orElseThrow(() -> new RuntimeException("Procurement not found"));

            QuotationCall quotationCall = procurement.getQuotationCall();

            // Ensure QuotationCall is not null
            if (quotationCall == null) {
                throw new RuntimeException("QuotationCall cannot be null");
            }

            // Update the status of the associated Demand
            demandRepo.updateStatusById("Recalled", quotationCall.getDemand().getId());

            // Delete the Procurement record
            procurementRepo.deleteById(procurementId);

            // Delete the associated QuotationCall record if necessary
            if (quotationCall.getId() != null) {
                quotationCallRepo.deleteById(quotationCall.getId());
            }

            return procurement; // Return the deleted Procurement (or null if you prefer)
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Optionally handle the exception differently
        }
    }

}
