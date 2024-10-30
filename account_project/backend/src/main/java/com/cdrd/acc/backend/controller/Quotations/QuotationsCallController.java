package com.cdrd.acc.backend.controller.Quotations;

import com.cdrd.acc.backend.entity.Demand.Demand;
import com.cdrd.acc.backend.entity.Demand.Item;
import com.cdrd.acc.backend.entity.Demand.ProjectDemand;
import com.cdrd.acc.backend.entity.Project;
import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.cdrd.acc.backend.services.Quotation.QuotationCallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotations")
public class QuotationsCallController {

    @Autowired
    private QuotationCallService quotationCallService;

    // Get All Quotation Call List
    @RequestMapping("/get-all-quotations")
    public ResponseEntity<List<QuotationCall>> getAllQuotationCall() {
        try {
            List<QuotationCall> quotationCalls = quotationCallService.getAllQuotationCalls();
            return ResponseEntity.ok(quotationCalls); // Returns 200 OK with the list of demands
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

        }
    }

    // Add Quotation Call
    @PostMapping("/add-quotation-call")
    public ResponseEntity<QuotationCall> addQuotationCall(@RequestBody QuotationCall quotationCall) {
        try {
            QuotationCall addedQuotationCall = quotationCallService.addQuotationCall(quotationCall);
            return ResponseEntity.ok(addedQuotationCall);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuotationCall> updateQuotationCall(@PathVariable Integer id, @RequestBody QuotationCall quotationCall) {
        quotationCall.setId(id); // Set the ID for the update
        QuotationCall updatedQuotation = quotationCallService.updateQuotationCall(quotationCall);
        return updatedQuotation != null
                ? ResponseEntity.ok(updatedQuotation)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuotationCall(@PathVariable Integer id) {
        quotationCallService.deleteQuotationCall(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get-by-qc-no/{qcNo}")
    public ResponseEntity<QuotationCall> getQuotationCallByQCNumber(@PathVariable String qcNo) {
        try {
            QuotationCall existingQuotationCall = quotationCallService.getQuotationCallByQCNumber(qcNo);
            return ResponseEntity.ok(existingQuotationCall);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/items-by-demand/{demandId}")
    public ResponseEntity<List<Item>> getItemsByDemandId(@PathVariable Integer demandId) {
        List<Item> itemList = quotationCallService.getItemByDemandId(demandId);

        if (itemList != null && !itemList.isEmpty()) {
            return ResponseEntity.ok(itemList); // Return 200 OK with the list of items
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if no items are found
        }
    }

    @GetMapping("/get-project-no/{id}")
    public ResponseEntity<ProjectDemand> getProjectDemandNumber(@PathVariable Integer id) {
        try {
            ProjectDemand exsistingProjectDemand = quotationCallService.getProjectDemandNumber(id);
            return ResponseEntity.ok(exsistingProjectDemand);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("get-project-name/{projectNo}")
    public ResponseEntity<Project> getProjectName(@PathVariable String projectNo) {
        try {
            Project existingProject = quotationCallService.getProjectName(projectNo);
            return ResponseEntity.ok(existingProject);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
