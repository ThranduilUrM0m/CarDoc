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
@DiscriminatorValue("EMPLOYEE")
public class Employee extends IPerson implements Serializable {
	@Column(length=40)
	protected String employeeMatricule;

	@OneToMany(mappedBy="Employee",targetEntity=Furlough.class, fetch=FetchType.EAGER)
	protected java.util.Collection<Furlough> Demands;
	@ManyToOne(optional=false) @JoinColumn(name="functionId", referencedColumnName="functionId")
	protected Function Works_As;
	@ManyToOne(optional=false) @JoinColumn(name="tvgId", referencedColumnName="tvgId")
	protected Tvg Work_At;
	@OneToOne(optional=false, cascade=CascadeType.ALL, mappedBy="Employee", targetEntity=Control.class)
	protected Control didControl;
   
   	public String getEmployeeMatricule() {
      return employeeMatricule;
   }
   	public void setEmployeeMatricule(String newEmployeeMatricule) {
      employeeMatricule = newEmployeeMatricule;
   }
   
	@Override
	public Long getIpersonId() {
		// TODO Auto-generated method stub
		return super.getIpersonId();
	}
	@Override
	public void setIpersonId(Long ipersonId) {
		// TODO Auto-generated method stub
		super.setIpersonId(ipersonId);
	}
	
	@Override
	public String getIpersonLastname() {
		// TODO Auto-generated method stub
		return super.getIpersonLastname();
	}
	@Override
	public void setIpersonLastname(String ipersonLastname) {
		// TODO Auto-generated method stub
		super.setIpersonLastname(ipersonLastname);
	}
	
	@Override
	public String getIpersonFirstname() {
		// TODO Auto-generated method stub
		return super.getIpersonFirstname();
	}
	@Override
	public void setIpersonFirstname(String ipersonFirstname) {
		// TODO Auto-generated method stub
		super.setIpersonFirstname(ipersonFirstname);
	}
	
	@Override
	public Date getIpersonBirthday() {
		// TODO Auto-generated method stub
		return super.getIpersonBirthday();
	}
	@Override
	public void setIpersonBirthday(Date ipersonBirthday) {
		// TODO Auto-generated method stub
		super.setIpersonBirthday(ipersonBirthday);
	}
	
	@Override
	public String getIpersonCity() {
		// TODO Auto-generated method stub
		return super.getIpersonCity();
	}
	@Override
	public void setIpersonCity(String ipersonCity) {
		// TODO Auto-generated method stub
		super.setIpersonCity(ipersonCity);
	}
	
	@Override
	public String getIpersonNationalcardid() {
		// TODO Auto-generated method stub
		return super.getIpersonNationalcardid();
	}
	@Override
	public void setIpersonNationalcardid(String ipersonNationalcardid) {
		// TODO Auto-generated method stub
		super.setIpersonNationalcardid(ipersonNationalcardid);
	}
	
	@Override
	public String getIpersonEmail() {
		// TODO Auto-generated method stub
		return super.getIpersonEmail();
	}
	@Override
	public void setIpersonEmail(String ipersonEmail) {
		// TODO Auto-generated method stub
		super.setIpersonEmail(ipersonEmail);
	}
	
	@Override
	public String getIpersonPhone() {
		// TODO Auto-generated method stub
		return super.getIpersonPhone();
	}	
	@Override
	public void setIpersonPhone(String ipersonPhone) {
		// TODO Auto-generated method stub
		super.setIpersonPhone(ipersonPhone);
	}
   
	public Employee(Long ipersonId, String ipersonLastname, String ipersonFirstname, java.util.Date ipersonBirthday, String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone, String employeeMatricule, Function works_As, Tvg works_at, Account hasAccount) {
		super(ipersonId, ipersonLastname, ipersonFirstname, ipersonBirthday, ipersonCity, ipersonNationalcardid, ipersonEmail, ipersonPhone);
		this.employeeMatricule = employeeMatricule;
		Works_As = works_As;
		Work_At = works_at;
	}
	
	public java.util.Collection<Furlough> getDemands() {
		if (Demands == null)
			Demands = new java.util.HashSet<Furlough>();
		return Demands;
	}
	public java.util.Iterator getIteratorDemands() {
		if (Demands == null)
			Demands = new java.util.HashSet<Furlough>();
		return Demands.iterator();
	}

}