package com.cdrd.acc.backend.services.procurement;

import com.cdrd.acc.backend.entity.Procurment.ProcurementBy_DG;
import com.cdrd.acc.backend.repositories.procurement.ProcurementBy_DG_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProcurementBy_DG_Service {
    @Autowired
    private ProcurementBy_DG_Repo procurementByDGRepo; // Inject the repository

    public List<ProcurementBy_DG> getAllProcurements() {
        return procurementByDGRepo.findAll();
    }

    public Optional<ProcurementBy_DG> getProcurementById(Integer id) {
        return procurementByDGRepo.findById(id);
    }

    public ProcurementBy_DG createProcurement(ProcurementBy_DG procurementByDG) {
        return procurementByDGRepo.save(procurementByDG);
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
