package org.dev.entities;
/***********************************************************************
 * Module:  Account.java
 * Author:  Zakariae Boutaleb
 * Purpose: Defines the Class Account
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.dev.metier.IBookStrategy;
import org.dev.metier.IConsultStrategy;

/** @pdOid e7f947ea-fc37-4f57-94c8-1a12d7328a31 */
@Entity
public class Account implements Serializable{
   /** @pdOid 8047012e-9710-4d93-9753-cbcbfb63d099 */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long accountId;
   /** @pdOid 3187041b-2781-486f-b8f3-10e3c3f1cde7 */
   protected String accountLogin;
   /** @pdOid 170cc8f9-c094-4747-a4f0-8b51f99dde47 */
   protected String accountPassword;
   /** @pdOid 7651e7be-921a-4b18-a47f-f462f7bd5a7b */
   protected java.util.Date accountCreationdate;
   
   /** @pdOid e1dc7bf2-5b5e-476e-a81f-face397760ff */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdRoleInfo migr=no name=IBookStrategy assc=association19 */
   public IBookStrategy iBookStrategy;
   /** @pdRoleInfo migr=no name=IConsultStrategy assc=association20 */
   public IConsultStrategy iConsultStrategy;
   /** @pdRoleInfo migr=no name=ConnectionHistory assc=association7 coll=java.util.Collection impl=java.util.ArrayList mult=1..* type=Aggregation side=A */
   public java.util.Collection<ConnectionHistory> Has;
   
   /** @pdOid aa02a51b-1e05-4cb3-a4a2-b1afabbda81f */
   public Long getAccountId() {
      return accountId;
   }
   
   /** @param newAccountId
    * @pdOid 689832b9-b2e4-405b-99e2-24fe9029bbfb */
   public void setAccountId(Long newAccountId) {
      accountId = newAccountId;
   }
   
   /** @pdOid 8d6f6a71-e95c-42cc-bd5e-43125e0761fa */
   public String getAccountLogin() {
      return accountLogin;
   }
   
   /** @param newAccountLogin
    * @pdOid 99d02b76-b88b-4ae4-b208-81353a03ce7c */
   public void setAccountLogin(String newAccountLogin) {
      accountLogin = newAccountLogin;
   }
   
   /** @pdOid c1aa277e-e7b4-427f-952a-d86c534cf0d3 */
   public String getAccountPassword() {
      return accountPassword;
   }
   
   /** @param newAccountPassword
    * @pdOid 49eb908f-35bd-445a-a803-e96c5d5a6d39 */
   public void setAccountPassword(String newAccountPassword) {
      accountPassword = newAccountPassword;
   }
   
   /** @pdOid 78d1e023-4f7d-4918-8ad8-429e836e9ef0 */
   public java.util.Date getAccountCreationdate() {
      return accountCreationdate;
   }
   
   /** @param newAccountCreationdate
    * @pdOid 55af74c2-01a1-483e-94be-fb082052b99b */
   public void setAccountCreationdate(java.util.Date newAccountCreationdate) {
      accountCreationdate = newAccountCreationdate;
   }
   
   /** @param accountId 
    * @param accountLogin 
    * @param accountPassword 
    * @param accountCreationdate
    * @pdOid 32ab153e-19b8-45a3-b86f-fff0f9a30684 */
   public Account(Long accountId, String accountLogin, String accountPassword, java.util.Date accountCreationdate) {
      // TODO: implement
   }
   
   /** @pdOid d1e6640c-ea7e-4c66-84fc-17f3c6d2fdca */
   public boolean makeBook() {
      // TODO: implement
      return false;
   }
   
   /** @pdOid 3ae3c36d-57b0-4ac4-a515-8f9673b48477 */
   public boolean makeConsult() {
      // TODO: implement
      return false;
   }
   
   
   /** @pdGenerated default getter */
   public java.util.Collection<ConnectionHistory> getHas() {
      if (Has == null)
         Has = new java.util.ArrayList<ConnectionHistory>();
      return Has;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorHas() {
      if (Has == null)
         Has = new java.util.ArrayList<ConnectionHistory>();
      return Has.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newHas */
   public void setHas(java.util.Collection<ConnectionHistory> newHas) {
      removeAllHas();
      for (java.util.Iterator iter = newHas.iterator(); iter.hasNext();)
         addHas((ConnectionHistory)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newConnectionHistory */
   public void addHas(ConnectionHistory newConnectionHistory) {
      if (newConnectionHistory == null)
         return;
      if (this.Has == null)
         this.Has = new java.util.ArrayList<ConnectionHistory>();
      if (!this.Has.contains(newConnectionHistory))
         this.Has.add(newConnectionHistory);
   }
   
   /** @pdGenerated default remove
     * @param oldConnectionHistory */
   public void removeHas(ConnectionHistory oldConnectionHistory) {
      if (oldConnectionHistory == null)
         return;
      if (this.Has != null)
         if (this.Has.contains(oldConnectionHistory))
            this.Has.remove(oldConnectionHistory);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllHas() {
      if (Has != null)
         Has.clear();
   }

}