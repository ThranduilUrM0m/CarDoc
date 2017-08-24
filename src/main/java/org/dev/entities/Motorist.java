package org.dev.entities;
/***********************************************************************
 * Module:  Motorist.java
 * Author:  Zakariae
 * Purpose: Defines the Class Motorist
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@DiscriminatorValue("MOTORIST")
public class Motorist extends IPerson implements Serializable {
	
	protected java.util.Collection<Vehicle> HasVehicle;
	@OneToOne(optional=false, cascade=CascadeType.ALL, mappedBy="Motorist", targetEntity=Account.class)
	protected Account HasAccount;

	public Motorist(Long ipersonId, String ipersonLastname, String ipersonFirstname, Date ipersonBirthday, String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone, Collection<Vehicle> hasVehicle, Account hasAccount) {
		super(ipersonId, ipersonLastname, ipersonFirstname, ipersonBirthday, ipersonCity, ipersonNationalcardid, ipersonEmail, ipersonPhone);
		HasVehicle = hasVehicle;
		HasAccount = hasAccount;
	}
	
}