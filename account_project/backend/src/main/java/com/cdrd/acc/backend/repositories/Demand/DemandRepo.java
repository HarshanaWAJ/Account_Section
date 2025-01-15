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
import java.util.Map;
import java.util.Optional;

public interface DemandRepo extends JpaRepository<Demand, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Demand d SET d.status = ?1 WHERE d.id = ?2")
    int updateStatusById(String status, Integer id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE demand d " +
            "JOIN quotation_call qc ON d.id = qc.demand_id " +
            "SET d.status = 'Purchase Order Placed' " +
            "WHERE qc.qc_no = ?1", nativeQuery = true)
    void updateDemandStatusByQCNo(String qcNo);




    Optional<Demand> findById(Integer id);

    //
    // Update status as Quotation Called
    //
    @Query(value = "SELECT d.id, " +
            "d.allocation_per_year, " +
            "d.date, " +
            "d.demand_no, " +
            "d.estimated_value, " +
            "d.ref_no, " +
            "d.status, " +
            "pd.project_no, " +
            "pd.vote, " +
            "pd.wing " +
            "FROM demand d " +
            "INNER JOIN project_demand pd ON d.id = pd.id " +
            "WHERE d.status = 'on progress'", nativeQuery = true)
    List<Object[]> findAllProjectDemandStatusOnProgress();

    @Query("SELECT d FROM Demand d WHERE d.status = 'on progress' AND TYPE(d) = OtherDemand")
    List<Demand> findAllOtherDemandStatusOnProgress();

    @Query("SELECT COUNT(d) > 0 FROM Demand d WHERE d.demandNo = :demandNo")
    boolean existsByDemandNo(String demandNo);

    @Query("SELECT d FROM Demand d WHERE d.status = 'on progress'")
    List<Demand> findAllDemandStatusOnProgress();

    @Query("SELECT d FROM Demand d WHERE d.status = 'on progress' AND d.demandNo = ?1")
    Optional<Demand> findDemandByNumberAndStatus(String demandNo);

    @Query("SELECT COUNT(d) FROM Demand d WHERE d.status = 'on progress'")
    Integer getOnProgressDemandCount();

    @Query("SELECT COUNT(d) FROM Demand d WHERE d.status = 'Procurement Committed'")
    Integer getProcrumentComittedDemandCount();

    @Query("SELECT COUNT(d) FROM Demand d WHERE d.status = 'quotation called'")
    Integer getQuotationCalledDemandCount();

    @Query("SELECT COUNT(pd), pd.wing FROM ProjectDemand pd GROUP BY pd.wing")
    List<Object[]> getProjectDemandCountByWing();

    @Query("SELECT COUNT(od), od.vote FROM OtherDemand od GROUP BY od.vote")
    List<Object[]> getOtherDemandCountByVote();

    //Get All Details for Other Demand
    @Query(value = "SELECT *, " +
            "COALESCE(" +
            "(SELECT value FROM procurement_by_dg pdg WHERE pdg.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT value FROM procurement_by_rpc prpc WHERE prpc.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT value FROM procurement pmpc WHERE pmpc.quotation_call_id = qc.id LIMIT 1) " +
            ") AS procurement_amount, " +
            "COALESCE(" +
            "(SELECT no_of_quotation_received FROM procurement_by_dg pdg WHERE pdg.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT no_of_quotation_received FROM procurement_by_rpc prpc WHERE prpc.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT no_of_quotation_received FROM procurement pmpc WHERE pmpc.quotation_call_id = qc.id LIMIT 1) " +
            ") AS no_of_quotation_received, " +
            "COALESCE(" +
            "(SELECT approval_letter_date FROM procurement_by_dg pdg WHERE pdg.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT approved_date FROM procurement_by_rpc prpc WHERE prpc.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT approved_date FROM procurement pmpc WHERE pmpc.quotation_call_id = qc.id LIMIT 1) " +
            ") AS approved_date, " +
            "COALESCE(" +
            "(SELECT remark FROM procurement_by_dg pdg WHERE pdg.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT remark FROM procurement_by_rpc prpc WHERE prpc.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT remark FROM procurement pmpc WHERE pmpc.quotation_call_id = qc.id LIMIT 1) " +
            ") AS remark " +
            "FROM other_demand d " +
            "RIGHT JOIN demand dm ON d.id = dm.id " +
            "LEFT JOIN other_demand od ON d.id = od.id " +
            "LEFT JOIN quotation_call qc ON qc.demand_id = d.id " +
            "LEFT JOIN purchase_orders po ON po.quotation_call_id = qc.id " +
            "LEFT JOIN ledger_and_payment lp ON lp.purchase_order_id = po.id",
            nativeQuery = true)
    List<Map<String, Object>> findOtherDemandDetailsAsMap();


    @Query(value = "SELECT pd.*, p.*, qc.*, po.*, lp.*, prpc.*, prmpc.*, pdg.*, " +
            "COALESCE(" +
            "(SELECT value FROM procurement_by_dg pdg WHERE pdg.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT value FROM procurement_by_rpc prpc WHERE prpc.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT value FROM procurement prmpc WHERE prmpc.quotation_call_id = qc.id LIMIT 1) " +
            ") AS procurement_amount, " +
            "COALESCE(" +
            "(SELECT no_of_quotation_received FROM procurement_by_dg pdg WHERE pdg.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT no_of_quotation_received FROM procurement_by_rpc prpc WHERE prpc.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT no_of_quotation_received FROM procurement prmpc WHERE prmpc.quotation_call_id = qc.id LIMIT 1) " +
            ") AS no_of_quotation_received, " +
            "COALESCE(" +
            "(SELECT approval_letter_date FROM procurement_by_dg pdg WHERE pdg.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT approved_date FROM procurement_by_rpc prpc WHERE prpc.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT approved_date FROM procurement prmpc WHERE prmpc.quotation_call_id = qc.id LIMIT 1) " +
            ") AS approved_date, " +
            "COALESCE(" +
            "(SELECT remark FROM procurement_by_dg pdg WHERE pdg.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT remark FROM procurement_by_rpc prpc WHERE prpc.quotation_call_id = qc.id LIMIT 1), " +
            "(SELECT remark FROM procurement prmpc WHERE prmpc.quotation_call_id = qc.id LIMIT 1) " +
            ") AS remark " +
            "FROM project_demand pd " +
            "JOIN projects p ON p.id = pd.id " +
            "JOIN quotation_call qc ON qc.demand_id = pd.id " +
            "LEFT JOIN purchase_orders po ON po.quotation_call_id = qc.id " +
            "LEFT JOIN ledger_and_payment lp ON lp.purchase_order_id = po.id " +
            "LEFT JOIN procurement_by_rpc prpc ON prpc.quotation_call_id = qc.id " +
            "LEFT JOIN procurement prmpc ON prmpc.quotation_call_id = qc.id " +
            "LEFT JOIN procurement_by_dg pdg ON pdg.quotation_call_id = qc.id ", nativeQuery = true)
    List<Map<String, Object>> findProjectDemandDetailsAsMap();


}
