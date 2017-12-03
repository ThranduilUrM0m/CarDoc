package org.dev.entities;
/***********************************************************************
 * Module:  Booking.java
 * Author:  Zakariae
 * Purpose: Defines the Class Booking
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@bookingId")
public class Booking implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long bookingId;
   protected java.util.Date bookingDate;
   protected java.util.Date bookingCreationdate;
   protected boolean bookingIsCanceled;
   
   @ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name="accountId", referencedColumnName="accountId")
   protected Account account;
   @ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name="vehicleId", referencedColumnName="vehicleId")
   protected Vehicle vehicle;
   @ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name="tvgId", referencedColumnName="tvgId")
   protected Tvg tvg;
   
   @OneToOne(optional=false, cascade=CascadeType.ALL, mappedBy="booking", targetEntity=Control.class)
   protected Control control;
   
   @OneToMany(mappedBy="booking",targetEntity=Consultation.class)
   protected java.util.Collection<Consultation> consultation;
   
   public Long getBookingId() {
      return bookingId;
   }
   public void setBookingId(Long newBookingId) {
      bookingId = newBookingId;
   }
   
   public java.util.Date getBookingDate() {
      return bookingDate;
   }
   public void setBookingDate(java.util.Date newBookingDate) {
      bookingDate = newBookingDate;
   }
   
   public java.util.Date getBookingCreationdate() {
      return bookingCreationdate;
   }
   public void setBookingCreationdate(java.util.Date newBookingCreationdate) {
      bookingCreationdate = newBookingCreationdate;
   }
   
   	public boolean isBookingIsCanceled() {
		return bookingIsCanceled;
	}
	public void setBookingIsCanceled(boolean bookingIsCanceled) {
		this.bookingIsCanceled = bookingIsCanceled;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public Control getControl() {
		return control;
	}
	public void setControl(Control control) {
		this.control = control;
	}
	public java.util.Collection<Consultation> getConsultation() {
		return consultation;
	}
	public void setConsultation(java.util.Collection<Consultation> consultation) {
		this.consultation = consultation;
	}
	public Tvg getTvg() {
		return tvg;
	}
	public void setTvg(Tvg tvg) {
		this.tvg = tvg;
	}
	
	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Booking(Date bookingDate, Date bookingCreationdate, boolean bookingIsCanceled,
			Account account, Vehicle vehicle, Control control, Collection<Consultation> consultation, Tvg tvg) {
		super();
		this.bookingDate = bookingDate;
		this.bookingCreationdate = bookingCreationdate;
		this.bookingIsCanceled = bookingIsCanceled;
		this.account = account;
		this.control = control;
		this.consultation = consultation;
		this.tvg = tvg;
		this.vehicle = vehicle;
	}
}