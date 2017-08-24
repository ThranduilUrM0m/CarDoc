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

   public IControlStrategy iControlStrategy;
   
   @Column(name = "bookingId")
   protected long bookingId;
   @OneToOne(optional=false) @JoinColumn(name="bookingId")
   protected Booking belongsToBooking;
   @OneToMany(mappedBy="Control", targetEntity=ControlPoint.class, fetch=FetchType.EAGER)
   protected java.util.Collection<ControlPoint> Contains;
   @OneToOne(optional=false, cascade=CascadeType.ALL, mappedBy="Control", targetEntity=Employee.class)
   protected Employee doneByEmployee;
   @ManyToOne(optional=false) @JoinColumn(name="tvgId", referencedColumnName="tvgId")
   protected Tvg atTvg;
   
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
	
	public Control(Long controlId, int controlPrice, String controlType) {
		this.setControlId(controlId);
		this.setControlPrice(controlPrice);
		this.setControlType(controlType);
		this.setControlConfirmed(false);
	}
   
   public java.util.Collection<ControlPoint> getContains() {
      if (Contains == null)
         Contains = new java.util.ArrayList<ControlPoint>();
      return Contains;
   }
   public java.util.Iterator getIteratorContains() {
      if (Contains == null)
         Contains = new java.util.ArrayList<ControlPoint>();
      return Contains.iterator();
   }
}