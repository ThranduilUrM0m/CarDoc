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

@Entity
public class Booking implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long bookingId;
   protected java.util.Date bookingDate;
   protected java.util.Date bookingCreationdate;
   protected boolean bookingIsCanceled;
   
   @ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
   protected Account account;
   
   @OneToOne(optional=false, cascade=CascadeType.ALL, mappedBy="booking", targetEntity=Control.class)
   protected Control control;
   
   @OneToMany(mappedBy="booking",targetEntity=Consultation.class)
   protected java.util.Collection<Consultation> consultation;
   
   @ManyToOne(optional=false) @JoinColumn(name="tvgId", referencedColumnName="tvgId")
   protected Tvg tvg;
   
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
	public Booking(Long bookingId, Date bookingDate, Date bookingCreationdate, boolean bookingIsCanceled,
			Account account, Control control, Collection<Consultation> consultation, Tvg tvg) {
		super();
		this.bookingId = bookingId;
		this.bookingDate = bookingDate;
		this.bookingCreationdate = bookingCreationdate;
		this.bookingIsCanceled = bookingIsCanceled;
		this.account = account;
		this.control = control;
		this.consultation = consultation;
		this.tvg = tvg;
	}
}