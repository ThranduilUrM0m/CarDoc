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
	protected Account account;

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public MessageReceived() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MessageReceived(String imessageContent, Date imessageSeenTime, Date imessageSendingTime,
			Date imessageReceivingTime) {
		super(imessageContent, imessageSeenTime, imessageSendingTime, imessageReceivingTime);
		// TODO Auto-generated constructor stub
	}

	public MessageReceived(String imessageContent, Date imessageSeenTime, Date imessageSendingTime,
			Date imessageReceivingTime, Account account) {
		super(imessageContent, imessageSeenTime, imessageSendingTime, imessageReceivingTime);
		this.account = account;
	}
	
}