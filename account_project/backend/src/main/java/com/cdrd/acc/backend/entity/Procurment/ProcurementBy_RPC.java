package com.cdrd.acc.backend.entity.Procurment;

import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.cdrd.acc.backend.entity.supplier.Supplier;
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
@Table(name = "procurement_by_RPC")
public class ProcurementBy_RPC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date sendDate;
    private Date approvedDate;
    private String status;
    private String approvedBy;
    private String reference;
    private BigDecimal value;
    private int No_Of_Quotation_Received;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quotation_call_id")
    private QuotationCall quotationCall;

    // One-to-Many relationship with Procurement
    @OneToMany(mappedBy = "procurementByRpc",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Supplier> suppliers = new HashSet<>();
}
