package com.cdrd.acc.backend.entity.Ledger;

import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.cdrd.acc.backend.entity.purchase_order.PO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table (name = "ledger_and_payment")
public class Ledger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String g35No;
    private Date date;
    private String invoiceNo;
    private String value;
    private String voteNo;
    private BigDecimal remainBalance;
    private String qciNo;

    @ManyToOne
    @JoinColumn(name = "purchase_order_id") // Foreign key column in purchase_orders table
    private PO purchaseOrder;

}
