package com.cdrd.acc.backend.controller.Demand;

import com.cdrd.acc.backend.dto.Demand.DemandStatusDTO;
import com.cdrd.acc.backend.entity.Demand.Demand;
import com.cdrd.acc.backend.entity.Demand.OtherDemand;
import com.cdrd.acc.backend.entity.Demand.ProjectDemand;
import com.cdrd.acc.backend.services.Demand.DemandService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/demands")
public class DemandController {

    @Autowired
    private DemandService demandService;

    // Get All Demands
    @GetMapping("/get-all-demand")
    public ResponseEntity<List<Demand>> getAllDemands() {
        try {
            List<Demand> demands = demandService.findAll();
            return ResponseEntity.ok(demands); // Returns 200 OK with the list of demands
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // Get By ID
    @GetMapping("/get-demand/{id}")
    public ResponseEntity<Demand> getDemandById(@PathVariable Integer id) {
        try {
            Demand demand = demandService.findById(id);
            return demand != null
                    ? ResponseEntity.ok(demand) // Returns 200 OK with the demand
                    : ResponseEntity.notFound().build(); // Returns 404 Not Found if not found
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //Add Demand
    @PostMapping("/add-demand")
    public ResponseEntity<Demand> createDemand(@RequestBody Demand demand) {
        try {
            // Check for existing demand with the same demandNo
            if (demandService.existsByDemandNo(demand.getDemandNo())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(null); // Return 409 Conflict
            }
            Demand createdDemand = demandService.save(demand);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDemand); // Returns 201 Created with the created demand
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping("/update-demand/{id}")
    public ResponseEntity<Demand> updateDemand(@PathVariable Integer id, @RequestBody Demand demand) {
        try {
            // Check if the demand with the given ID exists
            if (!demandService.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            demand.setId(id);  // Ensure the ID is set
            Demand updatedDemand = demandService.update(demand);
            return ResponseEntity.ok(updatedDemand); // Returns 200 OK with the updated demand
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @DeleteMapping("/delete-demand/{id}")
    public ResponseEntity<Void> deleteDemand(@PathVariable Integer id) {
        try {
            demandService.delete(id);
            return ResponseEntity.noContent().build(); // Returns 204 No Content on successful deletion
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping("/update-demand-status/{id}")
    public ResponseEntity<Void> updateDemandStatus(@PathVariable Integer id, @RequestBody DemandStatusDTO demandStatusUpdateDTO) {
        try {
            demandService.updateDemandStatus(id, demandStatusUpdateDTO.getStatus());
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get-project-demand")
    public ResponseEntity<List> getAllProjectDemand() {
        try {
            List<ProjectDemand> projectDemands = demandService.getAllProjectDemand();
            return ResponseEntity.ok(projectDemands);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get-other-demand")
    public ResponseEntity<List> getAllOtherDemand() {
        try {
            List<OtherDemand> otherDemands = demandService.getAllOtherDemand();
            return ResponseEntity.ok(otherDemands);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/project-on-progress")
    public ResponseEntity<List<Demand>> getProjectDemandsOnProgress() {
        try {
            List<Demand> demands = demandService.getAllProjectDemandsOnProgress();
            return ResponseEntity.ok(demands);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/other-on-progress")
    public ResponseEntity<List<Demand>> getOtherDemandsOnProgress() {
        try {
            List<Demand> demands = demandService.getAllOtherDemandsOnProgress();
            return ResponseEntity.ok(demands);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/demand-on-progress")
    public ResponseEntity<List<Demand>> getDemandsOnProgress() {
        System.out.println("Hello");
        try {
            List<Demand> demands = demandService.getAllDemandsOnProgress();
            return ResponseEntity.ok(demands);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get-demand-by-name/{demandNo}")
    public ResponseEntity<Optional<Demand>> getDemandByStatusAndDemandNo(@PathVariable String demandNo) {
        System.out.println(demandNo);
        try {
            Optional<Demand> demand = demandService.getAllDemandsByName(demandNo);
            return ResponseEntity.ok(demand);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Optional.empty());
        }
    }

    // Get Other Demand Count
    @GetMapping("/get-other-demand-count")
    public ResponseEntity<Integer> getOtherDemandCount() {
        try {
            Integer otherDemandCount = demandService.getOtherDemandCount();
            return ResponseEntity.ok(otherDemandCount);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }

}
