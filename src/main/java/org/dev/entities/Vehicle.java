package org.dev.entities;
/***********************************************************************
 * Module:  Vehicle.java
 * Author:  Zakariae
 * Purpose: Defines the Class Vehicle
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@vehicleId")
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

   @ManyToOne(optional=true) @JoinColumn(name="motoristMatricule", referencedColumnName="motoristMatricule")
   protected Motorist motorist;
   
   @OneToMany(mappedBy="vehicle",targetEntity=Booking.class, fetch = FetchType.EAGER)
   protected java.util.Collection<Booking> booking;
   
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
	public Motorist getMotorist() {
		return motorist;
	}
	public void setMotorist(Motorist motorist) {
		this.motorist = motorist;
	}
	
	@Override
	public String toString() {
		return "Vehicle [vehicleBrand=" + vehicleBrand + ", vehicleType=" + vehicleType + ", vehicleFirstCirculation="
				+ vehicleFirstCirculation + ", vehicleRegistration=" + vehicleRegistration + ", motorist=" + motorist
				+ "]";
	}
	
	public Vehicle() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Vehicle(String vehicleBrand, String vehicleType, Date vehicleFirstCirculation,
			String vehicleRegistration, Motorist motorist, Collection<Booking> booking) {
		super();
		this.vehicleBrand = vehicleBrand;
		this.vehicleType = vehicleType;
		this.vehicleFirstCirculation = vehicleFirstCirculation;
		this.vehicleRegistration = vehicleRegistration;
		this.motorist = motorist;
		this.booking = booking;
	}
}