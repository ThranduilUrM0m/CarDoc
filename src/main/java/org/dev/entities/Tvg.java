package org.dev.entities;
/***********************************************************************
 * Module:  Tvg.java
 * Author:  Zakariae
 * Purpose: Defines the Class Tvg
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.dev.metier.IEmployingStrategy;

/** @pdOid d77826f4-fadc-4907-933b-a9045386e3ce */
@Entity
public class Tvg implements IEmployingStrategy, Serializable {
   /** @pdOid 472969fd-a380-45ad-88f8-cf90ffb0fc04 */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long tvgId;
   /** @pdOid 490b4fd4-c104-4f8d-b0b3-480b8091eca0 */
   protected String tvgLegalname;
   /** @pdOid d6ad91c9-9d31-4e28-a6f4-72031ea79c93 */
   protected String tvgLegaladresse;
   /** @pdOid 4fef5c30-f23a-4ca2-8a5d-1484481f4b23 */
   protected java.util.Date tvgCreationdate;
   /** @pdOid 0cea65f0-3ab5-4804-911e-662a12823c1d */
   protected String tvgCity;
   /** @pdOid 570ad78c-4fe5-4314-98b5-2aeef03f8835 */
   protected String tvgCountry;
   /** @pdOid 69553763-2345-4ed9-a40d-b73702cfe239 */
   protected String tvgRegion;
   /** @pdOid d0ad06ef-839d-4537-a9e4-30eb1ba708d6 */
   protected String tvgEmail;
   /** @pdOid 3dc9dd02-576e-47bc-a22f-0d65d22baa40 */
   protected String tvgPhone;
   /** @pdOid 034b3260-3cf1-44eb-bd0e-f4ca785deb3d */
   protected java.util.Date tvgDaystartA;
   /** @pdOid 6ccdea53-4954-4b8d-88eb-48d7de8de2cf */
   protected java.util.Date tvgDaystartB;
   /** @pdOid cd3315cd-5eb9-463c-8057-cf5ea1822180 */
   protected java.util.Date tvgDayendA;
   /** @pdOid 63251f4c-c179-4081-a6d4-e1c51164af39 */
   protected java.util.Date tvgDayendB;
   /** @pdOid 1d147d5b-6df9-4cff-8d4b-266ae4a99af6 */
   protected boolean tvgAvailable;
   
   /** @pdOid ea1738d7-ae6a-4ce1-b3ef-ef9cb922dde6 */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdRoleInfo migr=no name=Employee assc=association3 coll=java.util.Collection impl=java.util.HashSet mult=1..* type=Composition */
   public java.util.Collection<Employee> Workers;
   
   /** @pdOid a405ee62-bb76-4c3c-a567-bca15efedb32 */
   public Long getTvgId() {
      return tvgId;
   }
   
   /** @param newTvgId
    * @pdOid 227f78bf-524b-4a0e-a099-8fb655c8344c */
   public void setTvgId(Long newTvgId) {
      tvgId = newTvgId;
   }
   
   /** @pdOid 6df0e5d9-e26a-4aab-b053-8d6851b3e71c */
   public String getTvgLegalname() {
      return tvgLegalname;
   }
   
   /** @param newTvgLegalname
    * @pdOid fd82cd81-4563-4e44-814c-56e82ad36c69 */
   public void setTvgLegalname(String newTvgLegalname) {
      tvgLegalname = newTvgLegalname;
   }
   
   /** @pdOid 0abfc40f-6e8a-4279-a711-09c96c97d75d */
   public String getTvgLegaladresse() {
      return tvgLegaladresse;
   }
   
   /** @param newTvgLegaladresse
    * @pdOid 73558c81-7701-427b-9037-6c56fee0062c */
   public void setTvgLegaladresse(String newTvgLegaladresse) {
      tvgLegaladresse = newTvgLegaladresse;
   }
   
   /** @pdOid 8042489d-e807-4426-abe6-f74cdc94422a */
   public java.util.Date getTvgCreationdate() {
      return tvgCreationdate;
   }
   
   /** @param newTvgCreationdate
    * @pdOid 0cdb80ca-7c2c-4640-b544-0ec54a772a99 */
   public void setTvgCreationdate(java.util.Date newTvgCreationdate) {
      tvgCreationdate = newTvgCreationdate;
   }
   
   /** @pdOid b7e3e0f1-99cf-4841-a47a-8faeff6af652 */
   public String getTvgCity() {
      return tvgCity;
   }
   
   /** @param newTvgCity
    * @pdOid 9827b58c-f265-46ad-9a69-3388b2bc338f */
   public void setTvgCity(String newTvgCity) {
      tvgCity = newTvgCity;
   }
   
   /** @pdOid 338cf321-7cba-4fcd-8870-c8e567c5a05d */
   public String getTvgCountry() {
      return tvgCountry;
   }
   
   /** @param newTvgCountry
    * @pdOid be5105aa-3b14-4d91-806a-fcf852ecf787 */
   public void setTvgCountry(String newTvgCountry) {
      tvgCountry = newTvgCountry;
   }
   
   /** @pdOid 01a9dc2c-4f1a-4845-895e-205a734c38b9 */
   public String getTvgRegion() {
      return tvgRegion;
   }
   
   /** @param newTvgRegion
    * @pdOid f3a22250-bb04-4d6b-884c-c9ed5bd23160 */
   public void setTvgRegion(String newTvgRegion) {
      tvgRegion = newTvgRegion;
   }
   
   /** @pdOid 9f1afba2-9bae-4620-b73b-88c6e8e55234 */
   public String getTvgEmail() {
      return tvgEmail;
   }
   
   /** @param newTvgEmail
    * @pdOid 677a4d95-2dd6-4590-8e25-063a275e9be2 */
   public void setTvgEmail(String newTvgEmail) {
      tvgEmail = newTvgEmail;
   }
   
   /** @pdOid fe19eedb-29f4-4a4b-b91e-9ca67979cdea */
   public String getTvgPhone() {
      return tvgPhone;
   }
   
   /** @param newTvgPhone
    * @pdOid 993146e1-3b9d-44a1-be04-abce1bf44282 */
   public void setTvgPhone(String newTvgPhone) {
      tvgPhone = newTvgPhone;
   }
   
   /** @param tvgId 
    * @param tvgLegalname 
    * @param tvgLegaladresse 
    * @param tvgCreationdate 
    * @param tvgCity 
    * @param tvgCountry 
    * @param tvgRegion 
    * @param tvgEmail 
    * @param tvgPhone 
    * @param tvgDaystartA 
    * @param tvgDaystartB 
    * @param tvgDayendA 
    * @param tvgDayendB
    * @pdOid f007a7a2-f4ed-443c-802c-28dd99742ef5 */
   public Tvg(Long tvgId, String tvgLegalname, String tvgLegaladresse, java.util.Date tvgCreationdate, String tvgCity, String tvgCountry, String tvgRegion, String tvgEmail, String tvgPhone, java.util.Date tvgDaystartA, java.util.Date tvgDaystartB, java.util.Date tvgDayendA, java.util.Date tvgDayendB) {
      // TODO: implement
   }
   
   /** @pdOid b4d648fe-33b9-4e6a-b670-853b7b9455ec */
   public java.util.Date getTvgDaystartA() {
      return tvgDaystartA;
   }
   
   /** @param newTvgDaystartA
    * @pdOid 2703039e-6694-4316-957a-9ea53a0fe5b9 */
   public void setTvgDaystartA(java.util.Date newTvgDaystartA) {
      tvgDaystartA = newTvgDaystartA;
   }
   
   /** @pdOid e76122e6-facf-4062-8358-d1a55027bb59 */
   public java.util.Date getTvgDaystartB() {
      return tvgDaystartB;
   }
   
   /** @param newTvgDaystartB
    * @pdOid 57d5c322-af2e-4514-9a00-ae1a2f8980f3 */
   public void setTvgDaystartB(java.util.Date newTvgDaystartB) {
      tvgDaystartB = newTvgDaystartB;
   }
   
   /** @pdOid 8457d1a3-fd01-4944-9b2b-0a8ed05f2c70 */
   public java.util.Date getTvgDayendA() {
      return tvgDayendA;
   }
   
   /** @param newTvgDayendA
    * @pdOid fc52a702-ac19-442a-9e6f-7f69772f4d74 */
   public void setTvgDayendA(java.util.Date newTvgDayendA) {
      tvgDayendA = newTvgDayendA;
   }
   
   /** @pdOid 8957b09b-0913-4dce-9fc4-013a0a53310b */
   public java.util.Date getTvgDayendB() {
      return tvgDayendB;
   }
   
   /** @param newTvgDayendB
    * @pdOid 79469d74-8c08-4e98-99e8-a90fb4f00569 */
   public void setTvgDayendB(java.util.Date newTvgDayendB) {
      tvgDayendB = newTvgDayendB;
   }
   
   /** @pdOid b2a55899-70ab-4a45-a89a-4b80c88baeff */
   public boolean getTvgAvailable() {
      return tvgAvailable;
   }
   
   /** @param newTvgAvailable
    * @pdOid fb6a1eb0-50b3-419a-b35e-4265691ceb83 */
   public void setTvgAvailable(boolean newTvgAvailable) {
      tvgAvailable = newTvgAvailable;
   }
   
   /** @pdOid 7c42541f-d299-4cb6-96e0-57c47879b53a */
   public boolean addEmployee() {
      // TODO: implement
      return false;
   }
   
   /** @pdOid 3a627a7d-5273-42b1-ae82-c5615657ed6f */
   public boolean removeEmployee() {
      // TODO: implement
      return false;
   }
   
   
   /** @pdGenerated default getter */
   public java.util.Collection<Employee> getWorkers() {
      if (Workers == null)
         Workers = new java.util.HashSet<Employee>();
      return Workers;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorWorkers() {
      if (Workers == null)
         Workers = new java.util.HashSet<Employee>();
      return Workers.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newWorkers */
   public void setWorkers(java.util.Collection<Employee> newWorkers) {
      removeAllWorkers();
      for (java.util.Iterator iter = newWorkers.iterator(); iter.hasNext();)
         addWorkers((Employee)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newEmployee */
   public void addWorkers(Employee newEmployee) {
      if (newEmployee == null)
         return;
      if (this.Workers == null)
         this.Workers = new java.util.HashSet<Employee>();
      if (!this.Workers.contains(newEmployee))
         this.Workers.add(newEmployee);
   }
   
   /** @pdGenerated default remove
     * @param oldEmployee */
   public void removeWorkers(Employee oldEmployee) {
      if (oldEmployee == null)
         return;
      if (this.Workers != null)
         if (this.Workers.contains(oldEmployee))
            this.Workers.remove(oldEmployee);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllWorkers() {
      if (Workers != null)
         Workers.clear();
   }

}