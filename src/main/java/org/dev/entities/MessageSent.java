package org.dev.entities;
/***********************************************************************
 * Module:  MessageSent.java
 * Author:  Zakariae
 * Purpose: Defines the Class MessageSent
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;

/** @pdOid 124cb6c9-4bfa-40b0-a47a-8abf17f08af0 */
@Entity
public class MessageSent extends IMessage implements Serializable {
   /** @pdOid 9818437a-28ef-49e8-a2a8-fa2ded97799f */
   protected String messageSentReceiver;
   
   /** @pdOid 0ce65429-6640-436a-b5e1-d8def1d7b9ef */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid 8926ceae-fb77-447a-8577-d3a89b6b21a5 */
   public String getMessageSentReceiver() {
      return messageSentReceiver;
   }
   
   /** @param newMessageSentReceiver
    * @pdOid 4aab4906-2269-4d8a-94a9-e507149fbba2 */
   public void setMessageSentReceiver(String newMessageSentReceiver) {
      messageSentReceiver = newMessageSentReceiver;
   }
   
   /** @pdOid df4948ee-8cec-47ae-962d-19a4d3b73dff */
   public MessageSent() {
      // TODO: implement
   }
   
   /** @param imessageId 
    * @param imessageContent 
    * @param imessageSeenTime 
    * @param imessageSendingTime 
    * @param imessageReceivingTime
    * @pdOid d4133896-1024-46ae-8574-8bb230c1f7f8 */
   public boolean createIMessage(Long imessageId, String imessageContent, java.util.Date imessageSeenTime, java.util.Date imessageSendingTime, java.util.Date imessageReceivingTime) {
      // TODO: implement
      return false;
   }
   
   /** @pdOid 48eef444-078c-4efa-9ec7-88b8e6f7a97d */
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