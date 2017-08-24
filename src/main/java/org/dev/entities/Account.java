package org.dev.entities;
/***********************************************************************
 * Module:  Account.java
 * Author:  Zakariae Boutaleb
 * Purpose: Defines the Class Account
 ***********************************************************************/

import java.awt.print.Book;
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

import org.dev.metier.IBookStrategy;
import org.dev.metier.ICancelBookStrategy;
import org.dev.metier.IConsultStrategy;

@Entity
public class Account implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long accountId;
   @Column(length=40)
   protected String accountLogin;
   @Column(length=100)
   protected String accountPassword;
   protected java.util.Date accountCreationdate;
   
   public IBookStrategy iBookStrategy;
   public ICancelBookStrategy iCancelStrategy;
   public IConsultStrategy iConsultStrategy;
   
   @OneToMany(mappedBy="Account",targetEntity=ConnectionHistory.class, fetch=FetchType.EAGER)
   protected java.util.Collection<ConnectionHistory> HasConnectionHistory;
   @OneToMany(mappedBy="Account",targetEntity=Consultation.class, fetch=FetchType.EAGER)
   protected java.util.Collection<Consultation> HasConsultation;
   @OneToMany(mappedBy="Account",targetEntity=Booking.class, fetch=FetchType.EAGER)
   protected java.util.Collection<Booking> HasBooking;
   @OneToMany(mappedBy="Account",targetEntity=Picture.class, fetch=FetchType.EAGER)
   protected java.util.Collection<Picture> HasPicture;
   @OneToMany(mappedBy="Account",targetEntity=MessageSent.class, fetch=FetchType.EAGER)
   protected java.util.Collection<MessageSent> sendMessages;
   @OneToMany(mappedBy="Account",targetEntity=MessageReceived.class, fetch=FetchType.EAGER)
   protected java.util.Collection<MessageReceived> receiveMessages;
   
   @OneToOne(optional=true, cascade=CascadeType.ALL, mappedBy="Account", targetEntity=Tvg.class)
   protected Tvg belongsToTvg;
   @OneToOne(optional=true, cascade=CascadeType.ALL, mappedBy="Account", targetEntity=Motorist.class)
   protected Motorist belongsToMotorist;
   
   public Long getAccountId() {
      return this.accountId;
   }
   public void setAccountId(Long newAccountId) {
	   this.accountId = newAccountId;
   }
   
   public String getAccountLogin() {
      return this.accountLogin;
   }
   public void setAccountLogin(String newAccountLogin) {
	   this.accountLogin = newAccountLogin;
   }
   
   public String getAccountPassword() {
      return this.accountPassword;
   }
   public void setAccountPassword(String newAccountPassword) {
	   this.accountPassword = newAccountPassword;
   }
   
   public java.util.Date getAccountCreationdate() {
      return this.accountCreationdate;
   }
   public void setAccountCreationdate(java.util.Date newAccountCreationdate) {
	   this.accountCreationdate = newAccountCreationdate;
   }
   
   public Account(Long accountId, String accountLogin, String accountPassword, java.util.Date accountCreationdate) {
	   this.setAccountId(accountId);
	   this.setAccountLogin(accountLogin);
	   this.setAccountPassword(accountPassword);
	   this.setAccountCreationdate(accountCreationdate);
   }   
   
   public java.util.Collection<ConnectionHistory> getHasConnectionHistory() {
      if (HasConnectionHistory == null)
    	  HasConnectionHistory = new java.util.ArrayList<ConnectionHistory>();
      return HasConnectionHistory;
   }
   public java.util.Iterator getIteratorHasConnectionHistory() {
      if (HasConnectionHistory == null)
    	  HasConnectionHistory = new java.util.ArrayList<ConnectionHistory>();
      return HasConnectionHistory.iterator();
   }
   
   public java.util.Collection<Consultation> getHasConsultation() {
      if (HasConsultation == null)
    	  HasConsultation = new java.util.ArrayList<Consultation>();
      return HasConsultation;
   }
   public java.util.Iterator getIteratorHasConsultation() {
      if (HasConsultation == null)
    	  HasConsultation = new java.util.ArrayList<Consultation>();
      return HasConsultation.iterator();
   }
   
   public java.util.Collection<Booking> getHasBooking() {
      if (HasBooking == null)
    	  HasBooking = new java.util.ArrayList<Booking>();
      return HasBooking;
   }
   public java.util.Iterator getIteratorHasBooking() {
      if (HasBooking == null)
    	  HasBooking = new java.util.ArrayList<Booking>();
      return HasBooking.iterator();
   }
   
   public java.util.Collection<Picture> getHasPicture() {
      if (HasPicture == null)
    	  HasPicture = new java.util.ArrayList<Picture>();
      return HasPicture;
   }
   public java.util.Iterator getIteratorHasPicture() {
      if (HasPicture == null)
    	  HasPicture = new java.util.ArrayList<Picture>();
      return HasPicture.iterator();
   }
}