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
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="IPERSON_TYPE", length=2, discriminatorType=DiscriminatorType.STRING)
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
	
	public IPerson() {
		super();
		// TODO Auto-generated constructor stub
	}
	public IPerson(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday,
			String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone) {
		super();
		this.ipersonLastname = ipersonLastname;
		this.ipersonFirstname = ipersonFirstname;
		this.ipersonBirthday = ipersonBirthday;
		this.ipersonCity = ipersonCity;
		this.ipersonNationalcardid = ipersonNationalcardid;
		this.ipersonEmail = ipersonEmail;
		this.ipersonPhone = ipersonPhone;
	}
}