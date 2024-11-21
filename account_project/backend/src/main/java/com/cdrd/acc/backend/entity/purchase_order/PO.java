package com.cdrd.acc.backend.entity.purchase_order;

import com.cdrd.acc.backend.entity.Demand.Item;
import com.cdrd.acc.backend.entity.Ledger.Ledger;
import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "purchase_orders")
public class PO {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String poRef;

    private String qcNo;
    private Date poDate;
    private String wing;
    private String project;
    private BigDecimal poValue;
    private String supplier;

    // Using @ElementCollection to manage a list of items as strings
    @ElementCollection
    @CollectionTable(name = "po_items", joinColumns = @JoinColumn(name = "po_id"))
    @Column(name = "item")
    private List<String> items;

    private Date delivaryDate;

    // Relationship with QuotationCall
    @ManyToOne
    @JoinColumn(name = "quotation_call_id") // Foreign key column in purchase_orders table
    private QuotationCall quotationCall;

    @OneToMany(mappedBy = "purchaseOrder") // Changed to OneToMany
    private List<Ledger> ledgerList;

}
