package org.dev.entities;
/***********************************************************************
 * Module:  Tvg.java
 * Author:  Zakariae
 * Purpose: Defines the Class Tvg
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.dev.metier.IEmployingStrategy;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="tvgId")
public class Tvg implements Serializable {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
	protected Long tvgId;
	@Column(length=100)
	protected String tvgLegalname;
	@Column(length=100)
	protected String tvgLegaladresse;
	protected java.util.Date tvgCreationdate;
	@Column(length=100)
	protected String tvgCity;
	@Column(length=100)
	protected String tvgCountry;
	@Column(length=100)
	protected String tvgRegion;
	@Column(length=100, unique=true)
	protected String tvgEmail;
	@Column(length=20)
	protected String tvgPhone;
	@Column(length=5)
	protected String tvgDaystartA;
	@Column(length=5)
	protected String tvgDaystartB;
	@Column(length=5)
	protected String tvgDayendA;
	@Column(length=5)
	protected String tvgDayendB;
	protected boolean tvgAvailable;
	
	@OneToMany(mappedBy="tvg", targetEntity=Employee.class)
	protected java.util.Collection<Employee> employee;
	@OneToMany(mappedBy="tvg", targetEntity=Booking.class)
	protected java.util.Collection<Booking> booking;
	@OneToMany(mappedBy="tvg", targetEntity=Control.class)
	protected java.util.Collection<Control> control;
	  
	@OneToOne(optional=false) @JoinColumn(name="accountId")
	protected Account account;
   
	
	public java.util.Collection<Employee> getEmployee() {
		return employee;
	}
	public void setEmployee(java.util.Collection<Employee> employee) {
		this.employee = employee;
	}
	public java.util.Collection<Booking> getBooking() {
		return booking;
	}
	public void setBooking(java.util.Collection<Booking> booking) {
		this.booking = booking;
	}
	public java.util.Collection<Control> getControl() {
		return control;
	}
	public void setControl(java.util.Collection<Control> control) {
		this.control = control;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	
	public Long getTvgId() {
		return tvgId;
	}
	public void setTvgId(Long tvgId) {
		this.tvgId = tvgId;
	}
	public String getTvgLegalname() {
		return tvgLegalname;
	}
	public void setTvgLegalname(String tvgLegalname) {
		this.tvgLegalname = tvgLegalname;
	}
	public String getTvgLegaladresse() {
		return tvgLegaladresse;
	}
	public void setTvgLegaladresse(String tvgLegaladresse) {
		this.tvgLegaladresse = tvgLegaladresse;
	}
	public java.util.Date getTvgCreationdate() {
		return tvgCreationdate;
	}
	public void setTvgCreationdate(java.util.Date tvgCreationdate) {
		this.tvgCreationdate = tvgCreationdate;
	}
	public String getTvgCity() {
		return tvgCity;
	}
	public void setTvgCity(String tvgCity) {
		this.tvgCity = tvgCity;
	}
	public String getTvgCountry() {
		return tvgCountry;
	}
	public void setTvgCountry(String tvgCountry) {
		this.tvgCountry = tvgCountry;
	}
	public String getTvgRegion() {
		return tvgRegion;
	}
	public void setTvgRegion(String tvgRegion) {
		this.tvgRegion = tvgRegion;
	}
	public String getTvgEmail() {
		return tvgEmail;
	}
	public void setTvgEmail(String tvgEmail) {
		this.tvgEmail = tvgEmail;
	}
	public String getTvgPhone() {
		return tvgPhone;
	}
	public void setTvgPhone(String tvgPhone) {
		this.tvgPhone = tvgPhone;
	}
	public String getTvgDaystartA() {
		return tvgDaystartA;
	}
	public void setTvgDaystartA(String tvgDaystartA) {
		this.tvgDaystartA = tvgDaystartA;
	}
	public String getTvgDaystartB() {
		return tvgDaystartB;
	}
	public void setTvgDaystartB(String tvgDaystartB) {
		this.tvgDaystartB = tvgDaystartB;
	}
	public String getTvgDayendA() {
		return tvgDayendA;
	}
	public void setTvgDayendA(String tvgDayendA) {
		this.tvgDayendA = tvgDayendA;
	}
	public String getTvgDayendB() {
		return tvgDayendB;
	}
	public void setTvgDayendB(String tvgDayendB) {
		this.tvgDayendB = tvgDayendB;
	}
	public boolean isTvgAvailable() {
		return tvgAvailable;
	}
	public void setTvgAvailable(boolean tvgAvailable) {
		this.tvgAvailable = tvgAvailable;
	}
	
	public Tvg() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Tvg(String tvgLegalname, String tvgLegaladresse, Date tvgCreationdate, String tvgCity,
			String tvgCountry, String tvgRegion, String tvgEmail, String tvgPhone, String tvgDaystartA, String tvgDaystartB,
			String tvgDayendA, String tvgDayendB, boolean tvgAvailable,	Collection<Employee> employee, Collection<Control> control, Account account, Collection<Booking> booking) {
		super();
		this.tvgLegalname = tvgLegalname;
		this.tvgLegaladresse = tvgLegaladresse;
		this.tvgCreationdate = tvgCreationdate;
		this.tvgCity = tvgCity;
		this.tvgCountry = tvgCountry;
		this.tvgRegion = tvgRegion;
		this.tvgEmail = tvgEmail;
		this.tvgPhone = tvgPhone;
		this.tvgDaystartA = tvgDaystartA;
		this.tvgDaystartB = tvgDaystartB;
		this.tvgDayendA = tvgDayendA;
		this.tvgDayendB = tvgDayendB;
		this.tvgAvailable = tvgAvailable;
		this.employee = employee;
		this.control = control;
		this.account = account;
		this.booking = booking;
		// TODO Auto-generated constructor stub
	}
}