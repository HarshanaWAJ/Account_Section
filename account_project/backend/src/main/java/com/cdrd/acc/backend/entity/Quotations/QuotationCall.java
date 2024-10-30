package com.cdrd.acc.backend.entity.Quotations;

import com.cdrd.acc.backend.entity.Demand.Demand;
import com.cdrd.acc.backend.entity.Procurment.Procurement;
import com.cdrd.acc.backend.entity.purchase_order.PO;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "quotation_call")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QuotationCall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String qcNo;

    private Date qcDate;
    private Date openingDate;

    @ManyToOne
    @JoinColumn(name = "demand_id")
    private Demand demand;

    @OneToMany(mappedBy = "quotationCall", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Procurement> procurements;

    // One QuotationCall can be referenced by many Purchase Orders
    @OneToMany(mappedBy = "quotationCall", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PO> purchaseOrders;

}
