package com.cdrd.acc.backend.entity.Demand;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OtherDemand extends Demand {
    private String section;
    private String vote;
}
