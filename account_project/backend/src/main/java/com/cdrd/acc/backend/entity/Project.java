package com.cdrd.acc.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Table(name = "projects")
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  id;
    @Column(unique = true)
    private String projectNo;
    private String projectName;
    private Date startingDate;
    private Date endingDate;
    private String wing;

    private String projectType;

    private Date currentYear; // Can be null
    private Double expenditureUpToCurrentYear; // Can be null

    @Column(precision = 25, scale = 2)
    private BigDecimal estimatedValue;


    // set current Year
    public void setCurrentYear(int year) {
        this.currentYear = Date.valueOf(year+ "-12-31");
    }

    // function for get current year only
    public int getCurrentYear() {
        return this.currentYear.toLocalDate().getYear();
    }
}
