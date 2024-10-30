package com.cdrd.acc.backend.repositories.Demand;

import com.cdrd.acc.backend.entity.Demand.Demand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface DemandRepo extends JpaRepository<Demand, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Demand d SET d.status = ?1 WHERE d.id = ?2")
    int updateStatusById(String status, Integer id);

    Optional<Demand> findById(Integer id);

    //
    // Update status as Quotation Called
    //
    @Query("SELECT d FROM Demand d WHERE d.status = 'on progress' AND TYPE(d) = ProjectDemand")
    List<Demand> findAllProjectDemandStatusOnProgress();

    @Query("SELECT d FROM Demand d WHERE d.status = 'on progress' AND TYPE(d) = OtherDemand")
    List<Demand> findAllOtherDemandStatusOnProgress();

    @Query("SELECT COUNT(d) > 0 FROM Demand d WHERE d.demandNo = :demandNo")
    boolean existsByDemandNo(String demandNo);

    @Query("SELECT d FROM Demand d WHERE d.status = 'on progress'")
    List<Demand> findAllDemandStatusOnProgress();

    @Query("SELECT d FROM Demand d WHERE d.status = 'on progress' AND d.demandNo = ?1")
    Optional<Demand> findDemandByNumberAndStatus(String demandNo);


}
