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

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@consultationId")
public class Consultation implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long consultationId;
   
   @ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
   protected Account account;
   
   @ManyToOne(optional=false) @JoinColumn(name="bookingId", referencedColumnName="bookingId")
   protected Booking booking;
   
   public Long getConsultationId() {
      return consultationId;
   }
   public void setConsultationId(Long newConsultationId) {
      consultationId = newConsultationId;
   }
public Account getAccount() {
	return account;
}
public void setAccount(Account account) {
	this.account = account;
}
public Booking getBooking() {
	return booking;
}
public void setBooking(Booking booking) {
	this.booking = booking;
}

public Consultation() {
	super();
	// TODO Auto-generated constructor stub
}
public Consultation(Account account, Booking booking) {
	super();
	this.account = account;
	this.booking = booking;
}
}