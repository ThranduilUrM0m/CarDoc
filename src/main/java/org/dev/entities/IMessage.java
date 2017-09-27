package org.dev.entities;
/***********************************************************************
 * Module:  IMessage.java
 * Author:  Zakariae
 * Purpose: Defines the Interface IMessage
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;

@Entity
@Inheritance
@DiscriminatorColumn(name="IMESSAGE_TYPE")
public abstract class IMessage implements Serializable{
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
	protected Long imessageId;
	@Column(columnDefinition = "TEXT")
	protected String imessageContent;
   	protected java.util.Date imessageSeenTime;
   	protected java.util.Date imessageSendingTime;
   	protected java.util.Date imessageReceivingTime;
   
   	public Long getImessageId() {
	   return imessageId;
   	}
	public void setImessageId(Long imessageId) {
		this.imessageId = imessageId;
	}
	
	public String getImessageContent() {
		return imessageContent;
	}
	public void setImessageContent(String imessageContent) {
		this.imessageContent = imessageContent;
	}
	
	public java.util.Date getImessageSeenTime() {
		return imessageSeenTime;
	}
	public void setImessageSeenTime(java.util.Date imessageSeenTime) {
		this.imessageSeenTime = imessageSeenTime;
	}
	
	public java.util.Date getImessageSendingTime() {
		return imessageSendingTime;
	}
	public void setImessageSendingTime(java.util.Date imessageSendingTime) {
		this.imessageSendingTime = imessageSendingTime;
	}
	
	public java.util.Date getImessageReceivingTime() {
		return imessageReceivingTime;
	}
	public void setImessageReceivingTime(java.util.Date imessageReceivingTime) {
		this.imessageReceivingTime = imessageReceivingTime;
	}
	
	public IMessage() {
		super();
		// TODO Auto-generated constructor stub
	}
	public IMessage(String imessageContent, Date imessageSeenTime, Date imessageSendingTime,
			Date imessageReceivingTime) {
		super();
		this.imessageContent = imessageContent;
		this.imessageSeenTime = imessageSeenTime;
		this.imessageSendingTime = imessageSendingTime;
		this.imessageReceivingTime = imessageReceivingTime;
	}
}