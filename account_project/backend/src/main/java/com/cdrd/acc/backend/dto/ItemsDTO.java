package com.cdrd.acc.backend.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class ItemsDTO {
    private Long id;
    private String description;
    private Double estimatedValuePerUnit;
    private Integer quantity;
    private Long demandId;
}
