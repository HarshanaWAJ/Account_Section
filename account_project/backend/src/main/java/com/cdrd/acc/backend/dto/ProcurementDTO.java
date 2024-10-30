package com.cdrd.acc.backend.dto;

import com.cdrd.acc.backend.entity.supplier.Supplier;

import java.util.Date;
import java.util.List;

public class ProcurementDTO {
    private String qc_no;
    private Date approved_date;
    private Date send_date;
    private Supplier supplier;
    private List<ItemDTO> items;

    // Getters and Setters

    public String getQc_no() {
        return qc_no;
    }

    public void setQc_no(String qc_no) {
        this.qc_no = qc_no;
    }

    public Date getApproved_date() {
        return approved_date;
    }

    public void setApproved_date(Date approved_date) {
        this.approved_date = approved_date;
    }

    public Date getSend_date() {
        return send_date;
    }

    public void setSend_date(Date send_date) {
        this.send_date = send_date;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public List<ItemDTO> getItems() {
        return items;
    }

    public void setItems(List<ItemDTO> items) {
        this.items = items;
    }

    public static class ItemDTO {
        private String itemName;
        private int qty;
        private double pricePerUnit;

        // Getters and Setters

        public String getItemName() {
            return itemName;
        }

        public void setItemName(String itemName) {
            this.itemName = itemName;
        }

        public int getQty() {
            return qty;
        }

        public void setQty(int qty) {
            this.qty = qty;
        }

        public double getPricePerUnit() {
            return pricePerUnit;
        }

        public void setPricePerUnit(double pricePerUnit) {
            this.pricePerUnit = pricePerUnit;
        }
    }
}