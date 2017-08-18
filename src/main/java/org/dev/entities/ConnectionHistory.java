package org.dev.entities;
/***********************************************************************
 * Module:  ConnectionHistory.java
 * Author:  Zakariae
 * Purpose: Defines the Class ConnectionHistory
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid 0f4fb9da-f8bc-4053-8562-9e10f3525602 */
@Entity
public class ConnectionHistory implements Serializable{
   /** @pdOid a2ec3c23-ddde-46ad-be84-fc6419c2a22f */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long connectionhistoryId;
   /** @pdOid 64a09e5c-c24d-42b2-bdc2-3a0611b2161c */
   protected java.util.Date connectionhistoryStart;
   /** @pdOid 1913fec1-f9eb-463e-89a3-51e5afd682b5 */
   protected java.util.Date connectionhistoryEnd;
   /** @pdOid def406fc-30d2-467a-bb13-d2609a3161ec */
   protected String connectionhistoryDeviceip;
   /** @pdOid 8cee398c-efb8-4a25-8fe8-d6ed12de9f81 */
   protected String connectionhistoryDevicename;
   
   /** @pdOid 03034536-ba86-467e-a424-9ffe63c43183 */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid 9f9d78a5-56eb-4d02-869c-37331d0bf2af */
   public Long getConnectionhistoryId() {
      return connectionhistoryId;
   }
   
   /** @param newConnectionhistoryId
    * @pdOid 703ed622-f84f-4f73-878d-cbd279a6c0fd */
   public void setConnectionhistoryId(Long newConnectionhistoryId) {
      connectionhistoryId = newConnectionhistoryId;
   }
   
   /** @pdOid 87e412d5-637f-4aaf-9fea-d68248f3c064 */
   public java.util.Date getConnectionhistoryStart() {
      return connectionhistoryStart;
   }
   
   /** @param newConnectionhistoryStart
    * @pdOid 3e13993b-9d05-43d2-926c-0c1108ec7502 */
   public void setConnectionhistoryStart(java.util.Date newConnectionhistoryStart) {
      connectionhistoryStart = newConnectionhistoryStart;
   }
   
   /** @pdOid d19a14b0-8103-4c1d-8b31-13f63fc2757a */
   public java.util.Date getConnectionhistoryEnd() {
      return connectionhistoryEnd;
   }
   
   /** @param newConnectionhistoryEnd
    * @pdOid be593fd0-59ed-4e55-a474-e71493a97461 */
   public void setConnectionhistoryEnd(java.util.Date newConnectionhistoryEnd) {
      connectionhistoryEnd = newConnectionhistoryEnd;
   }
   
   /** @pdOid 29c23f3c-e49a-477e-bbc2-0346e60355d8 */
   public String getConnectionhistoryDeviceip() {
      return connectionhistoryDeviceip;
   }
   
   /** @param newConnectionhistoryDeviceip
    * @pdOid 70071689-6717-43ea-b949-6538431a4ba1 */
   public void setConnectionhistoryDeviceip(String newConnectionhistoryDeviceip) {
      connectionhistoryDeviceip = newConnectionhistoryDeviceip;
   }
   
   /** @pdOid ec285afd-baa0-4459-a188-e71667e7fedc */
   public String getConnectionhistoryDevicename() {
      return connectionhistoryDevicename;
   }
   
   /** @param newConnectionhistoryDevicename
    * @pdOid 69f7bb36-a8d8-4210-96ca-c8b28c9d203b */
   public void setConnectionhistoryDevicename(String newConnectionhistoryDevicename) {
      connectionhistoryDevicename = newConnectionhistoryDevicename;
   }
   
   /** @param connectionhistoryId 
    * @param connectionhistoryStart 
    * @param connectionhistoryEnd 
    * @param connectionhistoryDeviceip 
    * @param connectionhistoryDevicename
    * @pdOid 42ce3af8-6e57-4235-b185-18d5a059f488 */
   public ConnectionHistory(Long connectionhistoryId, java.util.Date connectionhistoryStart, java.util.Date connectionhistoryEnd, String connectionhistoryDeviceip, String connectionhistoryDevicename) {
      // TODO: implement
   }

}