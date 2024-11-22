package com.cdrd.acc.backend.entity.CashAdvance;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "advance_settlements")
@Entity
public class AdvanceSettlement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String serialNo;
    private String wingOrVote;
    private String projectOrVote;
    private String amount;
    private Date settleDate;
}
