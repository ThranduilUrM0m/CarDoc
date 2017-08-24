package org.dev.entities;
/***********************************************************************
 * Module:  Vehicle.java
 * Author:  Zakariae
 * Purpose: Defines the Class Vehicle
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Vehicle implements Serializable {
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long vehicleId;
   @Column(length=100)
   protected String vehicleBrand;
   @Column(length=100)
   protected String vehicleType;
   protected java.util.Date vehicleFirstCirculation;
   @Column(length=100)
   protected String vehicleRegistration;

	public Long getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}
	
	public String getVehicleBrand() {
		return vehicleBrand;
	}
	public void setVehicleBrand(String vehicleBrand) {
		this.vehicleBrand = vehicleBrand;
	}
	
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	
	public java.util.Date getVehicleFirstCirculation() {
		return vehicleFirstCirculation;
	}
	public void setVehicleFirstCirculation(java.util.Date vehicleFirstCirculation) {
		this.vehicleFirstCirculation = vehicleFirstCirculation;
	}
	
	public String getVehicleRegistration() {
		return vehicleRegistration;
	}
	public void setVehicleRegistration(String vehicleRegistration) {
		this.vehicleRegistration = vehicleRegistration;
	}
	
	public Vehicle(Long vehicleId, String vehicleBrand, String vehicleType, Date vehicleFirstCirculation, String vehicleRegistration) {
		super();
		this.vehicleId = vehicleId;
		this.vehicleBrand = vehicleBrand;
		this.vehicleType = vehicleType;
		this.vehicleFirstCirculation = vehicleFirstCirculation;
		this.vehicleRegistration = vehicleRegistration;
	}
  
}