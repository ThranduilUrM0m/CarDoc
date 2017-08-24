package org.dev.entities;
/***********************************************************************
 * Module:  Consultation.java
 * Author:  Zakariae
 * Purpose: Defines the Class Consultation
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Consultation implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long consultationId;
   
   @Column(name = "accountId")
   protected long accountId;
   @ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
   protected Account belongsToAccount;
   
   @Column(name = "bookingId")
   protected long bookingId;
   @ManyToOne(optional=false) @JoinColumn(name="bookingId", referencedColumnName="bookingId")
   protected Booking hasBooking;
   
   
   public Long getConsultationId() {
      return consultationId;
   }
   public void setConsultationId(Long newConsultationId) {
      consultationId = newConsultationId;
   }
   
   	public Booking getHasBooking() {
		return hasBooking;
	}
	public void setHasBooking(Booking hasBooking) {
		this.hasBooking = hasBooking;
	}
	
	public Consultation(Long consultationId, Booking hasBooking) {
		this.setConsultationId(consultationId);
		this.setHasBooking(hasBooking);
	}

}