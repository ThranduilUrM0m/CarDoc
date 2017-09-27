package org.dev.entities;
/***********************************************************************
 * Module:  Control.java
 * Author:  Zakariae
 * Purpose: Defines the Class Control
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
import javax.persistence.OneToOne;

import org.dev.metier.IControlStrategy;

@Entity
public class Control implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long controlId;
   protected int controlPrice;
   @Column(length=40)
   protected String controlType;
   protected boolean controlConfirmed;
   
   @OneToOne(optional=false) @JoinColumn(name="bookingId")
   protected Booking booking;
   @OneToOne(optional=false) @JoinColumn(name="employeeId")
   protected Employee employee;
   
   @OneToMany(mappedBy="control", targetEntity=ControlPoint.class)
   protected java.util.Collection<ControlPoint> controlPoint;
   @ManyToOne(optional=false) @JoinColumn(name="tvgId", referencedColumnName="tvgId")
   protected Tvg tvg;
   
   public Long getControlId() {
      return controlId;
   }
   public void setControlId(Long newControlId) {
      controlId = newControlId;
   }
   
   public int getControlPrice() {
      return controlPrice;
   }
   public void setControlPrice(int newControlPrice) {
      controlPrice = newControlPrice;
   }
   
   public String getControlType() {
      return controlType;
   }
   public void setControlType(String newControlType) {
      controlType = newControlType;
   }
   
   	public boolean isControlConfirmed() {
		return controlConfirmed;
	}
	public void setControlConfirmed(boolean controlConfirmed) {
		this.controlConfirmed = controlConfirmed;
	}
	public Booking getBooking() {
		return booking;
	}
	public void setBooking(Booking booking) {
		this.booking = booking;
	}
	public java.util.Collection<ControlPoint> getControlPoint() {
		return controlPoint;
	}
	public void setControlPoint(java.util.Collection<ControlPoint> controlPoint) {
		this.controlPoint = controlPoint;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public Tvg getTvg() {
		return tvg;
	}
	public void setTvg(Tvg tvg) {
		this.tvg = tvg;
	}
	
	public Control() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Control(int controlPrice, String controlType, boolean controlConfirmed, Booking booking,
			Collection<ControlPoint> controlPoint, Employee employee, Tvg tvg) {
		super();
		this.controlPrice = controlPrice;
		this.controlType = controlType;
		this.controlConfirmed = controlConfirmed;
		this.booking = booking;
		this.controlPoint = controlPoint;
		this.employee = employee;
		this.tvg = tvg;
	}
}