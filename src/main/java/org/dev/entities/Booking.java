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
   
   @Column(name = "accountId")
   protected long accountId;
   @ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
   protected Account belongsToAccount;
   
   @OneToOne(optional=false, cascade=CascadeType.ALL, mappedBy="Booking", targetEntity=Control.class)
   protected Control HasControl;
   @OneToMany(mappedBy="Booking",targetEntity=Consultation.class, fetch=FetchType.EAGER)
   protected java.util.Collection<Consultation> Consulted;
   
   @Column(name = "tvgId")
   private long tvgId;
   @ManyToOne(optional=false) @JoinColumn(name="tvgId", referencedColumnName="tvgId")
   protected Tvg AtTvg;
   
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
	
	public Control getHasControl() {
		return HasControl;
	}
	public void setHasControl(Control hasControl) {
		HasControl = hasControl;
	}
	
	public Tvg getAtTvg() {
		return AtTvg;
	}
	public void setAtTvg(Tvg atTvg) {
		AtTvg = atTvg;
	}
	public Booking(Long bookingId, Date bookingDate, Date bookingCreationdate, boolean bookingIsCanceled,
			long accountId, Account belongsToAccount, Control hasControl, Collection<Consultation> consulted,
			long tvgId, Tvg atTvg) {
		super();
		this.bookingId = bookingId;
		this.bookingDate = bookingDate;
		this.bookingCreationdate = bookingCreationdate;
		this.bookingIsCanceled = bookingIsCanceled;
		this.accountId = accountId;
		this.belongsToAccount = belongsToAccount;
		HasControl = hasControl;
		Consulted = consulted;
		this.tvgId = tvgId;
		AtTvg = atTvg;
	}
}