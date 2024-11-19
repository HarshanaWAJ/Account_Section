package com.cdrd.acc.backend.entity.Demand;

import com.cdrd.acc.backend.entity.Quotations.QuotationCall;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ProjectDemand.class, name = "projectDemand"),
        @JsonSubTypes.Type(value = OtherDemand.class, name = "otherDemand")
})
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "demand")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Demand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String demandNo;

    @Column(nullable = true, columnDefinition = "varchar(255) default 'on progress'")
    private String status;

    @Column(precision = 25, scale = 2)
    private BigDecimal estimatedValue;
    private Date date;

    @OneToMany(mappedBy = "demand", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Item> items = new HashSet<>();


    // Method to calculate total cost for all items
    public BigDecimal getTotalCost() {
        return items.stream()
                .map(Item::getTotalCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private String refNo;
    private BigDecimal allocationPerYear;

    @OneToMany(mappedBy = "demand", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<QuotationCall> quotations = new HashSet<>();

}
