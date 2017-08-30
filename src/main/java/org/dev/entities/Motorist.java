package org.dev.entities;
/***********************************************************************
 * Module:  Motorist.java
 * Author:  Zakariae
 * Purpose: Defines the Class Motorist
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
@DiscriminatorValue("MO")
public class Motorist extends IPerson implements Serializable {
	@Column(length=20)
	protected String motoristMatricule;
	
	@OneToMany(mappedBy="motorist", targetEntity=Vehicle.class)
	protected java.util.Collection<Vehicle> vehicle;

	@OneToOne(optional=false) @JoinColumn(name="accountId")
	protected Account account;

	public java.util.Collection<Vehicle> getVehicle() {
		return vehicle;
	}

	public void setVehicle(java.util.Collection<Vehicle> vehicle) {
		this.vehicle = vehicle;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Motorist(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday,
			String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone,
			Collection<Vehicle> vehicle, Account account) {
		super(ipersonLastname, ipersonFirstname, ipersonBirthday, ipersonCity, ipersonNationalcardid,
				ipersonEmail, ipersonPhone);
		this.vehicle = vehicle;
		this.account = account;
	}
	
}