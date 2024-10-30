package com.cdrd.acc.backend.services.Demand;

import com.cdrd.acc.backend.entity.Demand.Demand;
import com.cdrd.acc.backend.entity.Demand.Item;
import com.cdrd.acc.backend.entity.Demand.OtherDemand;
import com.cdrd.acc.backend.entity.Demand.ProjectDemand;
import com.cdrd.acc.backend.repositories.Demand.DemandRepo;
import com.cdrd.acc.backend.repositories.Demand.OtherDemandRepo;
import com.cdrd.acc.backend.repositories.Demand.ProjectDemandRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class DemandService {

    @Autowired
    private DemandRepo demandRepo;

    //Get All Demand List
    public List<Demand> findAll() {
        try {
            return demandRepo.findAll();
        } catch (Exception e) {
            System.err.println("Error fetching demands: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    public Demand findById(Integer id) {
        return demandRepo.findById(id).orElse(null);
    }

    public Demand save(Demand demand) {
        try {
            // Set default status
            demand.setStatus("on progress");

            // Set vote for ProjectDemand
            if (demand instanceof ProjectDemand) {
                ((ProjectDemand) demand).setVote("2057");
            }
            // Set the demand reference for each item
            for (Item item : demand.getItems()) {
                item.setDemand(demand); // Link each item to the demand
            }
            // Save the demand (this will also save items due to cascading)
            return demandRepo.save(demand);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public Demand update(Demand demand) {
        try {
            if (demand.getId() != null && demandRepo.existsById(demand.getId())) {
                // If the ID exists, perform an update.
                return demandRepo.save(demand);
            } else {
                throw new IllegalArgumentException("Demand ID must be provided for updating.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean existsById(Integer id) {
        try {
            return demandRepo.existsById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public void delete(Integer id) {
        try {
            demandRepo.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
    }

    public void updateDemandStatus(Integer id, String newStatus) {
        try {
            int updatedCount = demandRepo.updateStatusById(newStatus, id);
            if (updatedCount == 0) {
                System.out.println("No demand found with ID: " + id);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }



    // Project

    @Autowired
    private ProjectDemandRepo projectDemandRepo;

    public List<ProjectDemand> getAllProjectDemand() {
        try {
            return projectDemandRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    //Other Demand
    @Autowired
    private OtherDemandRepo otherDemandRepo;

    public List<OtherDemand> getAllOtherDemand() {
        try {
            return otherDemandRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    //
    // Get On Progress Demand for Projects
    //
    public List<Demand> getAllProjectDemandsOnProgress() {
        try {
            return demandRepo.findAllProjectDemandStatusOnProgress();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    //
    // Get On Progress Demand for Others
    //

    public List<Demand> getAllOtherDemandsOnProgress() {
        try {
            return demandRepo.findAllOtherDemandStatusOnProgress();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public boolean existsByDemandNo(String demandNo) {
        return demandRepo.existsByDemandNo(demandNo);
    }

    public List<Demand> getAllDemandsOnProgress() {
        try {
            return demandRepo.findAllDemandStatusOnProgress();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public Optional<Demand> getAllDemandsByName(String demandNo) {
        try {
            return demandRepo.findDemandByNumberAndStatus(demandNo);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty(); // Return an empty Optional in case of an error
        }
    }
}
