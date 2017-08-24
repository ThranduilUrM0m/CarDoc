package org.dev.entities;
/***********************************************************************
 * Module:  IPerson.java
 * Author:  Zakariae
 * Purpose: Defines the Interface IPerson
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;

@Entity
@Inheritance
@DiscriminatorColumn(name="IPERSON_TYPE")
public abstract class IPerson implements Serializable {
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long ipersonId;
   @Column(length=100)
   protected String ipersonLastname;
   @Column(length=100)
   protected String ipersonFirstname;
   protected java.util.Date ipersonBirthday;
   @Column(length=100)
   protected String ipersonCity;
   @Column(length=50)
   protected String ipersonNationalcardid;
   @Column(length=100)
   protected String ipersonEmail;
   @Column(length=20)
   protected String ipersonPhone;
   
   	public Long getIpersonId() {
		return ipersonId;
	}
	public void setIpersonId(Long ipersonId) {
		this.ipersonId = ipersonId;
	}
	
	public String getIpersonLastname() {
		return ipersonLastname;
	}
	public void setIpersonLastname(String ipersonLastname) {
		this.ipersonLastname = ipersonLastname;
	}
	
	public String getIpersonFirstname() {
		return ipersonFirstname;
	}
	public void setIpersonFirstname(String ipersonFirstname) {
		this.ipersonFirstname = ipersonFirstname;
	}
	
	public java.util.Date getIpersonBirthday() {
		return ipersonBirthday;
	}
	public void setIpersonBirthday(java.util.Date ipersonBirthday) {
		this.ipersonBirthday = ipersonBirthday;
	}
	
	public String getIpersonCity() {
		return ipersonCity;
	}
	public void setIpersonCity(String ipersonCity) {
		this.ipersonCity = ipersonCity;
	}
	
	public String getIpersonNationalcardid() {
		return ipersonNationalcardid;
	}
	public void setIpersonNationalcardid(String ipersonNationalcardid) {
		this.ipersonNationalcardid = ipersonNationalcardid;
	}
	
	public String getIpersonEmail() {
		return ipersonEmail;
	}
	public void setIpersonEmail(String ipersonEmail) {
		this.ipersonEmail = ipersonEmail;
	}
	
	public String getIpersonPhone() {
		return ipersonPhone;
	}
	public void setIpersonPhone(String ipersonPhone) {
		this.ipersonPhone = ipersonPhone;
	}

   public IPerson(Long ipersonId, String ipersonLastname, String ipersonFirstname, java.util.Date ipersonBirthday, String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone) {
	  this.setIpersonId(ipersonId);
	  this.setIpersonLastname(ipersonLastname);
	  this.setIpersonFirstname(ipersonFirstname);
	  this.setIpersonBirthday(ipersonBirthday);
	  this.setIpersonCity(ipersonCity);
	  this.setIpersonNationalcardid(ipersonNationalcardid);
	  this.setIpersonEmail(ipersonEmail);
	  this.setIpersonPhone(ipersonPhone);
   }

}