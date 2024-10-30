package com.cdrd.acc.backend.entity.supplier;

import com.cdrd.acc.backend.entity.Demand.Item;
import com.cdrd.acc.backend.entity.Procurment.Procurement;
import com.cdrd.acc.backend.entity.Procurment.ProcurementBy_DG;
import com.cdrd.acc.backend.entity.Procurment.ProcurementBy_RPC;
import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Table(name = "supplier")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String SupplierName;


    // One-to-Many relationship with Procurement
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "procurements_id")
    private Procurement procurement;

    // One-to-Many relationship with ProcurementBy_DG
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "procurements_by_DG_id")
    private ProcurementBy_DG procurementByDg;

    // One-to-Many relationship with ProcurementBy_RPC
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "procurements_by_RPC_id")
    private ProcurementBy_RPC procurementByRpc;

    // One-to-Many relationship with Item
    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Supplier_Items> items = new HashSet<>();

}
