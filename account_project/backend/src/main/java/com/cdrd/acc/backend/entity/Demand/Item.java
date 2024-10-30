package com.cdrd.acc.backend.entity.Demand;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String description;
    private int quantity;

    @Column(precision = 25, scale = 2, nullable = false) // ensure it's not nullable
    private BigDecimal estimatedValuePerUnit;

    public BigDecimal getTotalCost() {
        if (estimatedValuePerUnit == null) {
            return BigDecimal.ZERO; // handle null case
        }
        return estimatedValuePerUnit.multiply(BigDecimal.valueOf(quantity));
    }

    @ManyToOne
    @JoinColumn(name = "demand_id", nullable = false) // Ensure this is not nullable
    @JsonBackReference // Use this to avoid infinite recursion
    private Demand demand;

}
