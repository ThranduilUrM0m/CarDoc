package org.dev.entities;
/***********************************************************************
 * Module:  Control.java
 * Author:  Zakariae
 * Purpose: Defines the Class Control
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.dev.metier.IControlStrategy;

/** @pdOid d48caacb-04a3-4f23-9113-de47006b01ea */
@Entity
public class Control implements Serializable{
   /** @pdOid 4a148a24-ba67-4cff-99e3-52da2841f4f2 */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long controlId;
   /** @pdOid a6771537-4a28-41cf-b573-85e7c1adb8ee */
   protected int controlPrice;
   /** @pdOid 2b27ffef-d167-46bf-9337-2d84ad07a43d */
   protected String controlType;
   /** @pdOid aa1206e7-3880-4a97-b14c-358d06655a18 */
   protected boolean controlConfirmed;
   
   /** @pdOid 89c2dd15-a345-4ade-a988-090b537f96b2 */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdRoleInfo migr=no name=ControlPoint assc=association12 coll=java.util.Collection impl=java.util.ArrayList mult=1..* type=Aggregation */
   public java.util.Collection<ControlPoint> Contains;
   /** @pdRoleInfo migr=no name=IControlStrategy assc=association21 mult=1 */
   public IControlStrategy iControlStrategy;
   
   /** @pdOid cab86ea2-f9e5-4d54-a858-7299939827ee */
   public Long getControlId() {
      return controlId;
   }
   
   /** @param newControlId
    * @pdOid 2c799600-f377-46b9-b4b5-46d9ec218135 */
   public void setControlId(Long newControlId) {
      controlId = newControlId;
   }
   
   /** @pdOid db7e51bf-b42d-4f5d-a279-1ff5bd2953ea */
   public int getControlPrice() {
      return controlPrice;
   }
   
   /** @param newControlPrice
    * @pdOid b06cd902-b82f-45fc-b8e1-2a01b8f4b801 */
   public void setControlPrice(int newControlPrice) {
      controlPrice = newControlPrice;
   }
   
   /** @pdOid f609765b-fdcc-4bb2-a0c9-9c17a9f2be05 */
   public String getControlType() {
      return controlType;
   }
   
   /** @param newControlType
    * @pdOid b54d263f-15f6-4296-be57-791dbcb7921a */
   public void setControlType(String newControlType) {
      controlType = newControlType;
   }
   
   /** @param controlId 
    * @param controlPrice 
    * @param controlType
    * @pdOid 5b5e91c6-691f-4f43-8e30-e58f7f7c17fa */
   public Control(Long controlId, int controlPrice, String controlType) {
      // TODO: implement
   }
   
   
   /** @pdGenerated default getter */
   public java.util.Collection<ControlPoint> getContains() {
      if (Contains == null)
         Contains = new java.util.ArrayList<ControlPoint>();
      return Contains;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorContains() {
      if (Contains == null)
         Contains = new java.util.ArrayList<ControlPoint>();
      return Contains.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newContains */
   public void setContains(java.util.Collection<ControlPoint> newContains) {
      removeAllContains();
      for (java.util.Iterator iter = newContains.iterator(); iter.hasNext();)
         addContains((ControlPoint)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newControlPoint */
   public void addContains(ControlPoint newControlPoint) {
      if (newControlPoint == null)
         return;
      if (this.Contains == null)
         this.Contains = new java.util.ArrayList<ControlPoint>();
      if (!this.Contains.contains(newControlPoint))
         this.Contains.add(newControlPoint);
   }
   
   /** @pdGenerated default remove
     * @param oldControlPoint */
   public void removeContains(ControlPoint oldControlPoint) {
      if (oldControlPoint == null)
         return;
      if (this.Contains != null)
         if (this.Contains.contains(oldControlPoint))
            this.Contains.remove(oldControlPoint);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllContains() {
      if (Contains != null)
         Contains.clear();
   }

}