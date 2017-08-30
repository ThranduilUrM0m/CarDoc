package org.dev.entities;
/***********************************************************************
 * Module:  Employee.java
 * Author:  Zakariae
 * Purpose: Defines the Class Employee
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.dev.metier.ICancelFurloughStrategy;
import org.dev.metier.IControlStrategy;
import org.dev.metier.IFurloughStrategy;

@Entity
@DiscriminatorValue("EM")
public class Employee extends IPerson implements Serializable {
	@Column(length=40)
	protected String employeeMatricule;

	@OneToMany(mappedBy="employee",targetEntity=Furlough.class)
	protected java.util.Collection<Furlough> furlough;
	@ManyToOne(optional=false) @JoinColumn(name="functionId", referencedColumnName="functionId")
	protected Function function;
	@ManyToOne(optional=false) @JoinColumn(name="tvgId", referencedColumnName="tvgId")
	protected Tvg tvg;
	
	@OneToOne(optional=false, cascade=CascadeType.ALL, mappedBy="employee", targetEntity=Control.class)
	protected Control control;
   
   	public String getEmployeeMatricule() {
      return employeeMatricule;
   }
   	public void setEmployeeMatricule(String newEmployeeMatricule) {
      employeeMatricule = newEmployeeMatricule;
   }
	public java.util.Collection<Furlough> getFurlough() {
		return furlough;
	}
	public void setFurlough(java.util.Collection<Furlough> furlough) {
		this.furlough = furlough;
	}
	public Function getFunction() {
		return function;
	}
	public void setFunction(Function function) {
		this.function = function;
	}
	public Tvg getTvg() {
		return tvg;
	}
	public void setTvg(Tvg tvg) {
		this.tvg = tvg;
	}
	public Control getControl() {
		return control;
	}
	public void setControl(Control control) {
		this.control = control;
	}
	public Employee(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday,
			String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone,
			String employeeMatricule, Collection<Furlough> furlough, Function function, Tvg tvg, Control control) {
		super(ipersonLastname, ipersonFirstname, ipersonBirthday, ipersonCity, ipersonNationalcardid,
				ipersonEmail, ipersonPhone);
		this.employeeMatricule = employeeMatricule;
		this.furlough = furlough;
		this.function = function;
		this.tvg = tvg;
		this.control = control;
	}
}