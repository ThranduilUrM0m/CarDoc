package org.dev.entities;
/***********************************************************************
 * Module:  Consultation.java
 * Author:  Zakariae
 * Purpose: Defines the Class Consultation
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid e87d24ee-6772-4673-94dd-685c1d30baff */
@Entity
public class Consultation implements Serializable{
   /** @pdOid ca87277a-2e70-4804-a797-acdf40e04b69 */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long consultationId;
   
   /** @pdOid e3f3b1b6-4e79-4549-9ed4-6774bfd9f4f6 */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid 3c5554aa-24eb-461c-b652-91b7001b9c5d */
   public Long getConsultationId() {
      return consultationId;
   }
   
   /** @param newConsultationId
    * @pdOid 0426aa8b-2ff6-46f4-b300-bea50080f265 */
   public void setConsultationId(Long newConsultationId) {
      consultationId = newConsultationId;
   }
   
   /** @param consultationId
    * @pdOid 5323605b-9b03-4b54-a73a-1e4dfbe6bddd */
   public Consultation(Long consultationId) {
      // TODO: implement
   }

}