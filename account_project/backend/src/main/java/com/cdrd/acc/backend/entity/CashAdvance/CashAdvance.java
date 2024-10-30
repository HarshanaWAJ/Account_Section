package com.cdrd.acc.backend.entity.CashAdvance;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cash-advance")
@Entity
public class CashAdvance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String wing;
    private String projectNo;
    private String voteNo;
    private BigDecimal amount;
    private String reason;
    private Date modSendDate;
    private String status;

}
