package org.dev.entities;
/***********************************************************************
 * Module:  ConnectionHistory.java
 * Author:  Zakariae
 * Purpose: Defines the Class ConnectionHistory
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
public class ConnectionHistory implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long connectionhistoryId;
   protected java.util.Date connectionhistoryStart;
   protected java.util.Date connectionhistoryEnd;
   @Column(length=20)
   protected String connectionhistoryDeviceip;
   @Column(length=40)
   protected String connectionhistoryDevicename;
   
   @ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
   protected Account account;
   
   public Long getConnectionhistoryId() {
      return connectionhistoryId;
   }
   public void setConnectionhistoryId(Long newConnectionhistoryId) {
      connectionhistoryId = newConnectionhistoryId;
   }
   
   public java.util.Date getConnectionhistoryStart() {
      return connectionhistoryStart;
   }
   public void setConnectionhistoryStart(java.util.Date newConnectionhistoryStart) {
      connectionhistoryStart = newConnectionhistoryStart;
   }
   
   public java.util.Date getConnectionhistoryEnd() {
      return connectionhistoryEnd;
   }
   public void setConnectionhistoryEnd(java.util.Date newConnectionhistoryEnd) {
      connectionhistoryEnd = newConnectionhistoryEnd;
   }
   
   public String getConnectionhistoryDeviceip() {
      return connectionhistoryDeviceip;
   }
   public void setConnectionhistoryDeviceip(String newConnectionhistoryDeviceip) {
      connectionhistoryDeviceip = newConnectionhistoryDeviceip;
   }
   
   public String getConnectionhistoryDevicename() {
      return connectionhistoryDevicename;
   }
   public void setConnectionhistoryDevicename(String newConnectionhistoryDevicename) {
      connectionhistoryDevicename = newConnectionhistoryDevicename;
   }
public Account getAccount() {
	return account;
}
public void setAccount(Account account) {
	this.account = account;
}

public ConnectionHistory() {
	super();
	// TODO Auto-generated constructor stub
}
public ConnectionHistory(Date connectionhistoryStart, Date connectionhistoryEnd,
		String connectionhistoryDeviceip, String connectionhistoryDevicename, Account account) {
	super();
	this.connectionhistoryStart = connectionhistoryStart;
	this.connectionhistoryEnd = connectionhistoryEnd;
	this.connectionhistoryDeviceip = connectionhistoryDeviceip;
	this.connectionhistoryDevicename = connectionhistoryDevicename;
	this.account = account;
}
}