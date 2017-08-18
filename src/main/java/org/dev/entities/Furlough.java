package org.dev.entities;
/***********************************************************************
 * Module:  Furlough.java
 * Author:  Zakariae
 * Purpose: Defines the Class Furlough
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid 8e257c5f-2cb2-4688-8499-35490c6d57bf */
@Entity
public class Furlough implements Serializable{
   /** @pdOid bb423924-c5b1-4bf7-8468-77a4804a4bdd */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long furloughId;
   /** @pdOid 0d42c25d-9aee-4474-b18f-380ff8dbbeda */
   protected java.util.Date furloughDatebegin;
   /** @pdOid a61466d9-7587-4de7-a3d0-6a707884e1eb */
   protected java.util.Date furloughDateend;
   /** @pdOid def85e39-6e1d-44b3-ae55-2f3bf7adecfb */
   protected boolean furloughJustified;
   
   /** @pdOid 7f5cf4d6-af05-41a3-8ed6-2ada970c8c94 */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid fa972328-7fd2-417c-aeaa-229422152c96 */
   public Long getFurloughId() {
      return furloughId;
   }
   
   /** @param newFurloughId
    * @pdOid 5b07795e-4825-4f23-bb5d-09088e5b0cb7 */
   public void setFurloughId(Long newFurloughId) {
      furloughId = newFurloughId;
   }
   
   /** @pdOid b663e0b6-1d0d-47b6-b258-4e92e9001259 */
   public java.util.Date getFurloughDatebegin() {
      return furloughDatebegin;
   }
   
   /** @param newFurloughDatebegin
    * @pdOid 027bbca3-92c6-475c-bb54-f727b881476f */
   public void setFurloughDatebegin(java.util.Date newFurloughDatebegin) {
      furloughDatebegin = newFurloughDatebegin;
   }
   
   /** @pdOid 41b9ba26-ec11-4c04-bcac-34a1541cc74b */
   public java.util.Date getFurloughDateend() {
      return furloughDateend;
   }
   
   /** @param newFurloughDateend
    * @pdOid 6bb4e776-f2f3-40ee-85ec-9ae91daa229f */
   public void setFurloughDateend(java.util.Date newFurloughDateend) {
      furloughDateend = newFurloughDateend;
   }
   
   /** @pdOid 13d4c3f2-1845-4044-a456-7b17b9631f9e */
   public boolean getFurloughJustified() {
      return furloughJustified;
   }
   
   /** @param newFurloughJustified
    * @pdOid b4331ade-ee35-4660-8e20-bedbc80e6174 */
   public void setFurloughJustified(boolean newFurloughJustified) {
      furloughJustified = newFurloughJustified;
   }
   
   /** @param furloughId 
    * @param furloughDatebegin 
    * @param furloughDateend 
    * @param furloughJustified
    * @pdOid 5234d81c-9944-41b7-bc4e-b3083b6f26da */
   public Furlough(Long furloughId, java.util.Date furloughDatebegin, java.util.Date furloughDateend, boolean furloughJustified) {
      // TODO: implement
   }

}