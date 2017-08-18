package org.dev.entities;
/***********************************************************************
 * Module:  MessageReceived.java
 * Author:  Zakariae
 * Purpose: Defines the Class MessageReceived
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid c3e544c3-3f6a-4bda-93e0-b1c6b15a31cf */
@Entity
public class MessageReceived extends IMessage implements Serializable {
   /** @pdOid ae616fb8-c89c-4c3a-87f4-2645b49ac642 */
   protected String messageReceivedSender;
   
   /** @pdOid c8a99138-c8de-49cf-b47b-aa272b3de5ac */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid dc3c7b0b-ca8f-4b15-9b4e-f90a248d6663 */
   public String getMessageReceivedSender() {
      return messageReceivedSender;
   }
   
   /** @param newMessageReceivedSender
    * @pdOid 5fb31bcc-cd93-41e5-b3ba-7400cb076f7e */
   public void setMessageReceivedSender(String newMessageReceivedSender) {
      messageReceivedSender = newMessageReceivedSender;
   }
   
   /** @pdOid 5bba8c36-f979-4bc6-b877-b4593907deb8 */
   public MessageReceived() {
      // TODO: implement
   }
   
   /** @param imessageId 
    * @param imessageContent 
    * @param imessageSeenTime 
    * @param imessageSendingTime 
    * @param imessageReceivingTime
    * @pdOid bd1cd4c5-b2ba-4f9e-9f60-45309b65265a */
   public boolean createIMessage(Long imessageId, String imessageContent, java.util.Date imessageSeenTime, java.util.Date imessageSendingTime, java.util.Date imessageReceivingTime) {
      // TODO: implement
      return false;
   }
   
   /** @pdOid 8e778022-07d4-4dc2-b340-bc0247afb45a */
   public boolean deleteIMessage() {
      // TODO: implement
      return false;
   }

@Override
public Long getImessageId() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public String getImessageContent() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public Date getImessageSeenTime() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public Date getImessageSendingTime() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public Date getImessageReceivingTime() {
	// TODO Auto-generated method stub
	return null;
}

}