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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.dev.metier.IEmployingStrategy;

@Entity
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
   @Column(length=100)
   protected String tvgEmail;
   @Column(length=20)
   protected String tvgPhone;
   protected java.util.Date tvgDaystartA;
   protected java.util.Date tvgDaystartB;
   protected java.util.Date tvgDayendA;
   protected java.util.Date tvgDayendB;
   protected boolean tvgAvailable;

   @OneToMany(mappedBy="Tvg",targetEntity=Booking.class, fetch=FetchType.EAGER)
   protected java.util.Collection<Booking> hasBookings;
   @OneToMany(mappedBy="Tvg",targetEntity=Employee.class, fetch=FetchType.EAGER)
   protected java.util.Collection<Employee> workers;
   @OneToMany(mappedBy="Tvg",targetEntity=Control.class, fetch=FetchType.EAGER)
   protected java.util.Collection<Control> hasControl;
   @OneToOne(optional=false, cascade=CascadeType.ALL, mappedBy="Tvg", targetEntity=Account.class)
   protected Account HasAccount;
   
   public Long getTvgId() {
      return tvgId;
   }
   public void setTvgId(Long newTvgId) {
      tvgId = newTvgId;
   }
   
   public String getTvgLegalname() {
      return tvgLegalname;
   }
   public void setTvgLegalname(String newTvgLegalname) {
      tvgLegalname = newTvgLegalname;
   }
   
   public String getTvgLegaladresse() {
      return tvgLegaladresse;
   }
   public void setTvgLegaladresse(String newTvgLegaladresse) {
      tvgLegaladresse = newTvgLegaladresse;
   }
   
   public java.util.Date getTvgCreationdate() {
      return tvgCreationdate;
   }
   public void setTvgCreationdate(java.util.Date newTvgCreationdate) {
      tvgCreationdate = newTvgCreationdate;
   }
   
   public String getTvgCity() {
      return tvgCity;
   }
   public void setTvgCity(String newTvgCity) {
      tvgCity = newTvgCity;
   }
   
   public String getTvgCountry() {
      return tvgCountry;
   }
   public void setTvgCountry(String newTvgCountry) {
      tvgCountry = newTvgCountry;
   }
   
   public String getTvgRegion() {
      return tvgRegion;
   }
   public void setTvgRegion(String newTvgRegion) {
      tvgRegion = newTvgRegion;
   }
   
   public String getTvgEmail() {
      return tvgEmail;
   }
   public void setTvgEmail(String newTvgEmail) {
      tvgEmail = newTvgEmail;
   }
   
   public String getTvgPhone() {
      return tvgPhone;
   }
   public void setTvgPhone(String newTvgPhone) {
      tvgPhone = newTvgPhone;
   }
   
   public java.util.Date getTvgDaystartA() {
      return tvgDaystartA;
   }
   public void setTvgDaystartA(java.util.Date newTvgDaystartA) {
      tvgDaystartA = newTvgDaystartA;
   }
   
   public java.util.Date getTvgDaystartB() {
      return tvgDaystartB;
   }
   public void setTvgDaystartB(java.util.Date newTvgDaystartB) {
      tvgDaystartB = newTvgDaystartB;
   }
   
   public java.util.Date getTvgDayendA() {
      return tvgDayendA;
   }
   public void setTvgDayendA(java.util.Date newTvgDayendA) {
      tvgDayendA = newTvgDayendA;
   }
   
   public java.util.Date getTvgDayendB() {
      return tvgDayendB;
   }
   public void setTvgDayendB(java.util.Date newTvgDayendB) {
      tvgDayendB = newTvgDayendB;
   }
   
   public boolean getTvgAvailable() {
      return tvgAvailable;
   }
   public void setTvgAvailable(boolean newTvgAvailable) {
      tvgAvailable = newTvgAvailable;
   }
   
   public java.util.Collection<Employee> getworkers() {
      if (workers == null)
         workers = new java.util.HashSet<Employee>();
      return workers;
   }
   public java.util.Iterator getIteratorworkers() {
      if (workers == null)
         workers = new java.util.HashSet<Employee>();
      return workers.iterator();
   }
	public Tvg(Long tvgId, String tvgLegalname, String tvgLegaladresse, Date tvgCreationdate, String tvgCity, String tvgCountry, String tvgRegion, String tvgEmail, String tvgPhone, Date tvgDaystartA, Date tvgDaystartB, Date tvgDayendA, Date tvgDayendB, boolean tvgAvailable, Account account) {
		super();
		this.tvgId = tvgId;
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
		this.HasAccount = account;
	}
   
}