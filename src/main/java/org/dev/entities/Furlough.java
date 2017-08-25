package org.dev.entities;
/***********************************************************************
 * Module:  Furlough.java
 * Author:  Zakariae
 * Purpose: Defines the Class Furlough
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Furlough implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long furloughId;
   protected java.util.Date furloughDatebegin;
   protected java.util.Date furloughDateend;
   protected boolean furloughJustified;
   
   @ManyToOne(optional=false) @JoinColumn(name="employeeMatricule", referencedColumnName="employeeMatricule")
   protected Employee employee;
   
   public Long getFurloughId() {
      return furloughId;
   }
   public void setFurloughId(Long newFurloughId) {
      furloughId = newFurloughId;
   }
   
   public java.util.Date getFurloughDatebegin() {
      return furloughDatebegin;
   }
   public void setFurloughDatebegin(java.util.Date newFurloughDatebegin) {
      furloughDatebegin = newFurloughDatebegin;
   }
   
   public java.util.Date getFurloughDateend() {
      return furloughDateend;
   }
   public void setFurloughDateend(java.util.Date newFurloughDateend) {
      furloughDateend = newFurloughDateend;
   }
   
   public boolean getFurloughJustified() {
      return furloughJustified;
   }
   public void setFurloughJustified(boolean newFurloughJustified) {
      furloughJustified = newFurloughJustified;
   }
public Employee getEmployee() {
	return employee;
}
public void setEmployee(Employee employee) {
	this.employee = employee;
}
public Furlough(Long furloughId, Date furloughDatebegin, Date furloughDateend, boolean furloughJustified,
		Employee employee) {
	super();
	this.furloughId = furloughId;
	this.furloughDatebegin = furloughDatebegin;
	this.furloughDateend = furloughDateend;
	this.furloughJustified = furloughJustified;
	this.employee = employee;
}
}