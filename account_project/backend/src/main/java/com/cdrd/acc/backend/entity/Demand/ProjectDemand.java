package com.cdrd.acc.backend.entity.Demand;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDemand extends Demand {
    private String wing;
    private String projectNo;
    private String vote;
}
