package org.dev.entities;
/***********************************************************************
 * Module:  IMessage.java
 * Author:  Zakariae
 * Purpose: Defines the Interface IMessage
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid 47e91cae-02ac-4fb7-b2de-ed274ca114fe */
@Entity
public abstract class IMessage implements Serializable{
   /** @pdOid 491d8a16-cfc9-433c-b2e6-9e033c501ee1 */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long imessageId;
   /** @pdOid ef79679e-fafe-4f53-ba78-ff200e5de195 */
   protected String imessageContent;
   /** @pdOid e3b76e63-0ee6-40e4-a2a5-ead79e3b2672 */
   protected java.util.Date imessageSeenTime;
   /** @pdOid 27197abf-8129-49db-a4cb-35ee563c4475 */
   protected java.util.Date imessageSendingTime;
   /** @pdOid 6946129c-943c-4f5f-8f63-52a376bd7fc9 */
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
	/** @param imessageId 
    * @param imessageContent 
    * @param imessageSeenTime 
    * @param imessageSendingTime 
    * @param imessageReceivingTime
    * @pdOid 5a0b78ed-b1b8-4062-bb35-6ec5b9e9fb65 */
   public abstract boolean createIMessage(Long imessageId, String imessageContent, java.util.Date imessageSeenTime, java.util.Date imessageSendingTime, java.util.Date imessageReceivingTime);
   /** @pdOid 0a54df99-1a2b-46ec-827f-f82902785914 */
   public abstract boolean deleteIMessage();

}