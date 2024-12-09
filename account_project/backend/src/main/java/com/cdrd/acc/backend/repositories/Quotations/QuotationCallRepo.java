package com.cdrd.acc.backend.repositories.Quotations;

import com.cdrd.acc.backend.entity.Demand.Demand;
import com.cdrd.acc.backend.entity.Demand.Item;
import com.cdrd.acc.backend.entity.Demand.ProjectDemand;
import com.cdrd.acc.backend.entity.Project;
import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuotationCallRepo extends JpaRepository<QuotationCall, Integer> {

    @Query("SELECT q FROM QuotationCall q WHERE q.qcNo = ?1")
    QuotationCall getQuotationCallByQCNumber(String qcNo);

    @Query("SELECT i FROM Item i WHERE i.demand.id = ?1")
    List<Item> getItemListByDemandNo(Integer demandId);

    @Query("SELECT d FROM ProjectDemand d WHERE d.id =?1")
    ProjectDemand getProjectDemandNumber(Integer id);

    @Query("SELECT d FROM Project d WHERE d.projectNo = ?1")
    Project getProjectName(String projectNo);



}
