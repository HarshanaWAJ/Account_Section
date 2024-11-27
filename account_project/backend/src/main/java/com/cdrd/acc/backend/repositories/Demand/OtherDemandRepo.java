package com.cdrd.acc.backend.repositories.Demand;

import com.cdrd.acc.backend.entity.Demand.OtherDemand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OtherDemandRepo extends JpaRepository<OtherDemand, Integer> {
    List<OtherDemand> findAll();

    @Query("SELECT COUNT(od) FROM OtherDemand od")
    Integer getOtherDemandCount();
}
