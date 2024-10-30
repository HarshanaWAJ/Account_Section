package com.cdrd.acc.backend.entity.supplier;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "supplier_item_pro")
public class Supplier_Items {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;  // Reference back to Supplier
}
