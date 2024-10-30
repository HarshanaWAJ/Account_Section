package com.cdrd.acc.backend.services.procurement;

import com.cdrd.acc.backend.entity.Procurment.ProcurementBy_RPC;
import com.cdrd.acc.backend.repositories.procurement.ProcurementBy_RPC_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProcurementBy_RPC_Service {
    @Autowired
    private ProcurementBy_RPC_Repo procurementByRPCRepo; // Inject the repository

    public List<ProcurementBy_RPC> getAllProcurements() {
        return procurementByRPCRepo.findAll();
    }

    public Optional<ProcurementBy_RPC> getProcurementById(Integer id) {
        return procurementByRPCRepo.findById(id);
    }

    public ProcurementBy_RPC createProcurement(ProcurementBy_RPC procurementByRPC) {
        return procurementByRPCRepo.save(procurementByRPC);
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
