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

    @Column(precision = 25, scale = 2)
    private BigDecimal estimatedValue;
}
