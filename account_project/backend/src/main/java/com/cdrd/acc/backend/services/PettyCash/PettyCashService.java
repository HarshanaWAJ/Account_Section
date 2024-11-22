package com.cdrd.acc.backend.services.PettyCash;

import com.cdrd.acc.backend.entity.PettyCash.PettyCash;
import com.cdrd.acc.backend.repositories.PettyCash.PettyCashRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PettyCashService {

    @Autowired
    private PettyCashRepo pettyCashRepo;

    // Create a new PettyCash entry
    public PettyCash createPettyCash(PettyCash pettyCash) {
        try {
            return pettyCashRepo.save(pettyCash); // Save and return the saved PettyCash object
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Return null in case of an error
        }
    }

    // Get all PettyCash records
    public List<PettyCash> getAllPettyCash() {
        try {
            return pettyCashRepo.findAll(); // Retrieve all records from the repository
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Return null in case of an error
        }
    }

    // Get a PettyCash record by ID
    public PettyCash getPettyCashById(int id) {
        try {
            Optional<PettyCash> pettyCash = pettyCashRepo.findById(id);
            return pettyCash.orElse(null); // Return the PettyCash object or null if not found
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Return null in case of an error
        }
    }

    // Update an existing PettyCash record
    public PettyCash updatePettyCash(int id, PettyCash updatedPettyCash) {
        try {
            if (pettyCashRepo.existsById(id)) { // Check if the entity exists
                updatedPettyCash.setId(id); // Set the ID of the updated object to the existing one
                return pettyCashRepo.save(updatedPettyCash); // Save the updated record
            } else {
                return null; // Return null if the entity doesn't exist
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Return null in case of an error
        }
    }

    // Delete a PettyCash record by ID
    public boolean deletePettyCash(int id) {
        try {
            if (pettyCashRepo.existsById(id)) { // Check if the entity exists
                pettyCashRepo.deleteById(id); // Delete the record
                return true; // Successfully deleted
            } else {
                return false; // Return false if the entity doesn't exist
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Return false in case of an error
        }
    }}
