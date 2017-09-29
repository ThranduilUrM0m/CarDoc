package org.dev.entities;
/***********************************************************************
 * Module:  Account.java
 * Author:  Zakariae Boutaleb
 * Purpose: Defines the Class Account
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Size;

import org.dev.metier.IBookStrategy;
import org.dev.metier.ICancelBookStrategy;
import org.dev.metier.IConsultStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "accountPassword")
@Entity
public class Account implements Serializable{

   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long accountId;
   @Column(length=40) @Size(min = 6)
   protected String accountLogin;
   @Column(length=100) @Size(min = 6)
   protected @JsonIgnore String accountPassword;
   protected java.util.Date accountCreationdate;
   protected Boolean activated;
   @Column(length=40)
   protected String[] roles;
   
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
   	
	public Account() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Account(String accountLogin, String accountPassword, Date accountCreationdate, Boolean activated,
			Collection<ConnectionHistory> connectionHistory, Collection<Consultation> consultation,
			Collection<Booking> booking, Collection<Picture> picture, Collection<MessageSent> messageSent,
			Collection<MessageReceived> messageReceived, Tvg tvg, Motorist motorist, String... roles) {
		super();
		this.accountLogin = accountLogin;
		this.setAccountPassword(accountPassword);
		this.accountCreationdate = accountCreationdate;
		this.activated = activated;
		this.connectionHistory = connectionHistory;
		this.consultation = consultation;
		this.booking = booking;
		this.picture = picture;
		this.messageSent = messageSent;
		this.messageReceived = messageReceived;
		this.tvg = tvg;
		this.motorist = motorist;
		this.roles = roles;
	}

	public String getAccountLogin() {
		return accountLogin;
	}

	public void setAccountLogin(String accountLogin) {
		this.accountLogin = accountLogin;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getAccountPassword() {
		return accountPassword;
	}

	public void setAccountPassword(String accountPassword) {
		this.accountPassword = accountPassword;
	}

	public java.util.Date getAccountCreationdate() {
		return accountCreationdate;
	}

	public void setAccountCreationdate(java.util.Date accountCreationdate) {
		this.accountCreationdate = accountCreationdate;
	}
	
	public Boolean getActivated() {
		return activated;
	}

	public void setActivated(Boolean activated) {
		this.activated = activated;
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

	public String[] getRoles() {
		return roles;
	}

	public void setRoles(String[] roles) {
		this.roles = roles;
	}
	
}