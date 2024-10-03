package com.cdrd.acc.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

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
    private String projectDescription;
    private Date startingDate;
    private Date endingDate;
    private String wing;
}
