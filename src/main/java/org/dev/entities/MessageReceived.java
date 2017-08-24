package org.dev.entities;
/***********************************************************************
 * Module:  MessageReceived.java
 * Author:  Zakariae
 * Purpose: Defines the Class MessageReceived
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("MessageReceived")
public class MessageReceived extends IMessage implements Serializable {

	@ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
	protected Account sender;
	
	public Account getSender() {
		return sender;
	}
	public void setSender(Account sender) {
		this.sender = sender;
	}
	public MessageReceived(Long imessageId, String imessageContent, Date imessageSeenTime, Date imessageSendingTime, Date imessageReceivingTime, Account sender) {
		super(imessageId, imessageContent, imessageSeenTime, imessageSendingTime, imessageReceivingTime);
		this.sender = sender;
	}
	
	@Override
	public Long getImessageId() {
		// TODO Auto-generated method stub
		return super.getImessageId();
	}
	@Override
	public void setImessageId(Long imessageId) {
		// TODO Auto-generated method stub
		super.setImessageId(imessageId);
	}
	@Override
	public String getImessageContent() {
		// TODO Auto-generated method stub
		return super.getImessageContent();
	}
	@Override
	public void setImessageContent(String imessageContent) {
		// TODO Auto-generated method stub
		super.setImessageContent(imessageContent);
	}
	@Override
	public Date getImessageSeenTime() {
		// TODO Auto-generated method stub
		return super.getImessageSeenTime();
	}
	@Override
	public void setImessageSeenTime(Date imessageSeenTime) {
		// TODO Auto-generated method stub
		super.setImessageSeenTime(imessageSeenTime);
	}
	@Override
	public Date getImessageSendingTime() {
		// TODO Auto-generated method stub
		return super.getImessageSendingTime();
	}
	@Override
	public void setImessageSendingTime(Date imessageSendingTime) {
		// TODO Auto-generated method stub
		super.setImessageSendingTime(imessageSendingTime);
	}
	@Override
	public Date getImessageReceivingTime() {
		// TODO Auto-generated method stub
		return super.getImessageReceivingTime();
	}
	@Override
	public void setImessageReceivingTime(Date imessageReceivingTime) {
		// TODO Auto-generated method stub
		super.setImessageReceivingTime(imessageReceivingTime);
	}
	
	
}