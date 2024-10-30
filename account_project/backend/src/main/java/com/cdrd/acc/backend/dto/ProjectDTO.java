package com.cdrd.acc.backend.dto;

import com.cdrd.acc.backend.entity.Project;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

@Data
public class ProjectDTO {
    private int statusCode;
    private String error;
    private String message;
    private int  id;
    private String projectNo;
    private String projectName;
    private Date startingDate;
    private Date endingDate;
    private String wing;
    private BigDecimal estimatedValue;
    private Project project;
    private List<Project> projectList;
}
