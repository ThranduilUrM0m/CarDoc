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
   
   @OneToMany(mappedBy="account",targetEntity=ConnectionHistory.class)
   protected java.util.Collection<ConnectionHistory> connectionHistory;
   @OneToMany(mappedBy="account",targetEntity=Consultation.class)
   protected java.util.Collection<Consultation> consultation;
   @OneToMany(mappedBy="account",targetEntity=Booking.class)
   protected java.util.Collection<Booking> booking;
   @OneToMany(mappedBy="account",targetEntity=Picture.class)
   protected java.util.Collection<Picture> picture;
   @OneToMany(mappedBy="account",targetEntity=MessageSent.class)
   protected java.util.Collection<MessageSent> messageSent;
   @OneToMany(mappedBy="account",targetEntity=MessageReceived.class)
   protected java.util.Collection<MessageReceived> messageReceived;
   
   @OneToOne(optional=true, cascade=CascadeType.ALL, mappedBy="account", targetEntity=Tvg.class)
   protected Tvg tvg;
   @OneToOne(optional=true, cascade=CascadeType.ALL, mappedBy="account", targetEntity=Motorist.class)
   protected Motorist motorist;
   
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
public java.util.Collection<ConnectionHistory> getConnectionHistory() {
	return connectionHistory;
}
public void setConnectionHistory(java.util.Collection<ConnectionHistory> connectionHistory) {
	this.connectionHistory = connectionHistory;
}
public java.util.Collection<Consultation> getConsultation() {
	return consultation;
}
public void setConsultation(java.util.Collection<Consultation> consultation) {
	this.consultation = consultation;
}
public java.util.Collection<Booking> getBooking() {
	return booking;
}
public void setBooking(java.util.Collection<Booking> booking) {
	this.booking = booking;
}
public java.util.Collection<Picture> getPicture() {
	return picture;
}
public void setPicture(java.util.Collection<Picture> picture) {
	this.picture = picture;
}
public java.util.Collection<MessageSent> getMessageSent() {
	return messageSent;
}
public void setMessageSent(java.util.Collection<MessageSent> messageSent) {
	this.messageSent = messageSent;
}
public java.util.Collection<MessageReceived> getMessageReceived() {
	return messageReceived;
}
public void setMessageReceived(java.util.Collection<MessageReceived> messageReceived) {
	this.messageReceived = messageReceived;
}
public Tvg getTvg() {
	return tvg;
}
public void setTvg(Tvg tvg) {
	this.tvg = tvg;
}
public Motorist getMotorist() {
	return motorist;
}
public void setMotorist(Motorist motorist) {
	this.motorist = motorist;
}
public Account(Long accountId, String accountLogin, String accountPassword, Date accountCreationdate,
		Collection<ConnectionHistory> connectionHistory, Collection<Consultation> consultation,
		Collection<Booking> booking, Collection<Picture> picture, Collection<MessageSent> messageSent,
		Collection<MessageReceived> messageReceived, Tvg tvg, Motorist motorist) {
	super();
	this.accountId = accountId;
	this.accountLogin = accountLogin;
	this.accountPassword = accountPassword;
	this.accountCreationdate = accountCreationdate;
	this.connectionHistory = connectionHistory;
	this.consultation = consultation;
	this.booking = booking;
	this.picture = picture;
	this.messageSent = messageSent;
	this.messageReceived = messageReceived;
	this.tvg = tvg;
	this.motorist = motorist;
}
}