package com.cdrd.acc.backend.entity.Procurment;

import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.cdrd.acc.backend.entity.supplier.Supplier;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Table(name = "procurement_by_DG")
public class ProcurementBy_DG {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date approvalLetterDate;
    private String status;
    private String approvedBy;
    private String reference;
    private BigDecimal value;
    private int No_Of_Quotation_Received;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quotation_call_id")
    private QuotationCall quotationCall;

    // One-to-Many relationship with Procurement
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Supplier> suppliers = new HashSet<>();

}
