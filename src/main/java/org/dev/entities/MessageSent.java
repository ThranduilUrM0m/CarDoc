package org.dev.entities;
/***********************************************************************
 * Module:  MessageSent.java
 * Author:  Zakariae
 * Purpose: Defines the Class MessageSent
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("MessageSent")
public class MessageSent extends IMessage implements Serializable {
	
	@ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
	protected Account receiver;
	
	public Account getReceiver() {
		return receiver;
	}
	public void setReceiver(Account receiver) {
		this.receiver = receiver;
	}
	public MessageSent(Long imessageId, String imessageContent, Date imessageSeenTime, Date imessageSendingTime, Date imessageReceivingTime, Account receiver) {
		super(imessageId, imessageContent, imessageSeenTime, imessageSendingTime, imessageReceivingTime);
		this.receiver = receiver;
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