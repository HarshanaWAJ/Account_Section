package com.cdrd.acc.backend.repositories.Demand;

import com.cdrd.acc.backend.entity.Demand.ProjectDemand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectDemandRepo extends JpaRepository<ProjectDemand, Integer> {
    List<ProjectDemand> findAll();
}
