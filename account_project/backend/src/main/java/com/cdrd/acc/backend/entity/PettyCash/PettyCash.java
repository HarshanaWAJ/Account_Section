package com.cdrd.acc.backend.entity.PettyCash;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "petty_cash")
@Entity
public class PettyCash {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String voteNo;
    private String voteName;
    private Double amount;
    private String reason;
    private Date date;

}
