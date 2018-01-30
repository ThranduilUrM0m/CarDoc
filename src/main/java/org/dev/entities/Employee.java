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

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@ipersonId")
@DiscriminatorValue("EM")
public class Employee extends IPerson implements Serializable {
	@Column(length=40)
	protected String employeeMatricule;

	@ManyToOne(optional=true) @JoinColumn(name="tvgId", referencedColumnName="tvgId")
	protected Tvg tvg;
	@ManyToOne(optional=true) @JoinColumn(name="functionId", referencedColumnName="functionId")
	protected Function function;

	@OneToMany(mappedBy="employee", targetEntity=Furlough.class)
	protected java.util.Collection<Furlough> furlough;
	
	@OneToOne(optional=true, cascade=CascadeType.ALL, mappedBy="employee", targetEntity=Control.class)
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
	
	@Override
	public String toString() {
		return "Employee [employeeMatricule=" + employeeMatricule + ", furlough=" + furlough + ", function=" + function
				+ ", tvg=" + tvg + ", control=" + control + "]";
	}
	
	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Employee(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday, String ipersonCountry,
			String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone) {
		super(ipersonLastname, ipersonFirstname, ipersonBirthday, ipersonCountry, ipersonCity, ipersonNationalcardid,
				ipersonEmail, ipersonPhone);
		// TODO Auto-generated constructor stub
	}
	public Employee(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday,
			String ipersonCountry, String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone,
			String employeeMatricule, Collection<Furlough> furlough, Function function, Tvg tvg, Control control) {
		super(ipersonLastname, ipersonFirstname, ipersonBirthday, ipersonCountry, ipersonCity, ipersonNationalcardid,
				ipersonEmail, ipersonPhone);
		this.employeeMatricule = employeeMatricule;
		this.furlough = furlough;
		this.function = function;
		this.tvg = tvg;
		this.control = control;
	}
}