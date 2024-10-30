package com.cdrd.acc.backend.services.Quotation;

import com.cdrd.acc.backend.entity.Demand.Demand;
import com.cdrd.acc.backend.entity.Demand.Item;
import com.cdrd.acc.backend.entity.Demand.ProjectDemand;
import com.cdrd.acc.backend.entity.Project;
import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.cdrd.acc.backend.repositories.Demand.DemandRepo;
import com.cdrd.acc.backend.repositories.Quotations.QuotationCallRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class QuotationCallService {

    @Autowired
    private QuotationCallRepo quotationCallRepo;

    //Demand Repo
    @Autowired
    private DemandRepo demandRepo;

    //Get All Quotation calls
    public List<QuotationCall> getAllQuotationCalls() {
        try {
            return quotationCallRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Transactional
    public QuotationCall addQuotationCall(QuotationCall quotationCall) {
        try {
            // Ensure Demand is managed
            if (quotationCall.getDemand() != null) {
                Demand demand = demandRepo.findById(quotationCall.getDemand().getId())
                        .orElseThrow(() -> new RuntimeException("Demand not found"));
                quotationCall.setDemand(demand); // Set the managed Demand
            }

            // Save the QuotationCall
            QuotationCall savedQuotation = quotationCallRepo.save(quotationCall);
            demandRepo.updateStatusById("quotation called", quotationCall.getDemand().getId());
            return savedQuotation;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public QuotationCall updateQuotationCall(QuotationCall quotationCall) {
        try {
            // Ensure Demand is managed
            if (quotationCall.getDemand() != null) {
                Demand demand = demandRepo.findById(quotationCall.getDemand().getId())
                        .orElseThrow(() -> new RuntimeException("Demand not found"));
                quotationCall.setDemand(demand); // Set the managed Demand
            }

            // Ensure that the QuotationCall exists
            QuotationCall existingQuotation = quotationCallRepo.findById(quotationCall.getId())
                    .orElseThrow(() -> new RuntimeException("QuotationCall not found"));

            // Update fields
            existingQuotation.setQcNo(quotationCall.getQcNo());
            existingQuotation.setQcDate(quotationCall.getQcDate());
            existingQuotation.setOpeningDate(quotationCall.getOpeningDate());

            // Save updated QuotationCall
            QuotationCall updatedQuotation = quotationCallRepo.save(existingQuotation);
            return updatedQuotation;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public void deleteQuotationCall(Integer quotationCallId) {
        try {
            // Check if the QuotationCall exists
            QuotationCall existingQuotation = quotationCallRepo.findById(quotationCallId)
                    .orElseThrow(() -> new RuntimeException("QuotationCall not found"));

            // Optionally update related Demand status before deletion
            if (existingQuotation.getDemand() != null) {
                demandRepo.updateStatusById("status_before_deletion", existingQuotation.getDemand().getId());
            }

            // Delete the QuotationCall
            quotationCallRepo.delete(existingQuotation);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle exception if necessary
        }
    }

    public QuotationCall getQuotationCallByQCNumber(String qcNo) {
        try {
            return quotationCallRepo.getQuotationCallByQCNumber(qcNo);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Item> getItemByDemandId(Integer demandId) {
        try {
            List<Item> itemList = quotationCallRepo.getItemListByDemandNo(demandId);
            return itemList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public ProjectDemand getProjectDemandNumber(Integer id) {
        try {
            return quotationCallRepo.getProjectDemandNumber(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public Project getProjectName(String projectNo) {
        try {
            return quotationCallRepo.getProjectName(projectNo);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
