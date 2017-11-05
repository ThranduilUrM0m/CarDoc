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

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@imessageId")
@DiscriminatorValue("MessageSent")
public class MessageSent extends IMessage implements Serializable {
	
	@ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
	protected Account account;

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public MessageSent() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MessageSent(String imessageContent, Date imessageSeenTime, Date imessageSendingTime,
			Date imessageReceivingTime) {
		super(imessageContent, imessageSeenTime, imessageSendingTime, imessageReceivingTime);
		// TODO Auto-generated constructor stub
	}

	public MessageSent(String imessageContent, Date imessageSeenTime, Date imessageSendingTime,
			Date imessageReceivingTime, Account account) {
		super(imessageContent, imessageSeenTime, imessageSendingTime, imessageReceivingTime);
		this.account = account;
	}
	
}