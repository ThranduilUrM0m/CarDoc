package org.dev.entities;
/***********************************************************************
 * Module:  Employee.java
 * Author:  Zakariae
 * Purpose: Defines the Class Employee
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.dev.metier.IControlStrategy;
import org.dev.metier.IFurloughStrategy;

/** @pdOid b6a775a7-53dc-406b-9bff-4919b282bed1 */
@Entity
public class Employee extends IPerson implements IFurloughStrategy, IControlStrategy, Serializable {
   /** @pdOid 88494352-8596-410b-809c-01d015445aa7 */
   protected String employeeMatricule;
   
   /** @pdOid 49a9b572-291b-4a62-9980-cacbbafd113c */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdRoleInfo migr=no name=Furlough assc=association17 coll=java.util.Collection impl=java.util.HashSet mult=0..* */
   public java.util.Collection<Furlough> Demands;
   /** @pdRoleInfo migr=no name=Function assc=association18 mult=1 */
   public Function Works_As;
   
   /** @pdOid 048ab5e4-d36a-493f-a55f-158cc871fa9b */
   public Employee() {
      // TODO: implement
   }
   
   /** @pdOid 39cd427a-d0e5-449a-82ce-f00a931f8bcd */
   public String getEmployeeMatricule() {
      return employeeMatricule;
   }
   
   /** @param newEmployeeMatricule
    * @pdOid 17012f2e-d18d-46c5-841c-45439ad626fd */
   public void setEmployeeMatricule(String newEmployeeMatricule) {
      employeeMatricule = newEmployeeMatricule;
   }
   
   /** @param ipersonId 
    * @param ipersonLastname 
    * @param ipersonFirstname 
    * @param ipersonBirthday 
    * @param ipersonCity 
    * @param ipersonNationalcardid 
    * @param ipersonEmail 
    * @param ipersonPhone
    * @pdOid a018f036-5c5b-438a-93f4-1de204810b98 */
   public boolean createIPerson(Long ipersonId, String ipersonLastname, String ipersonFirstname, java.util.Date ipersonBirthday, String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone) {
      // TODO: implement
      return false;
   }
   
   /** @pdOid 2c5a9977-14e4-47f5-a5f1-c2be0bd3aa35 */
   public boolean addControl() {
      // TODO: implement
      return false;
   }
   
   /** @pdOid 0f0ecb81-1424-46e3-a944-d1955caa93c7 */
   public boolean addFurlough() {
      // TODO: implement
      return false;
   }
   
   /** @pdOid 9a825248-9722-4c40-9c88-575769376c1e */
   public boolean removeFurlough() {
      // TODO: implement
      return false;
   }
   
   
   /** @pdGenerated default getter */
   public java.util.Collection<Furlough> getDemands() {
      if (Demands == null)
         Demands = new java.util.HashSet<Furlough>();
      return Demands;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorDemands() {
      if (Demands == null)
         Demands = new java.util.HashSet<Furlough>();
      return Demands.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newDemands */
   public void setDemands(java.util.Collection<Furlough> newDemands) {
      removeAllDemands();
      for (java.util.Iterator iter = newDemands.iterator(); iter.hasNext();)
         addDemands((Furlough)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newFurlough */
   public void addDemands(Furlough newFurlough) {
      if (newFurlough == null)
         return;
      if (this.Demands == null)
         this.Demands = new java.util.HashSet<Furlough>();
      if (!this.Demands.contains(newFurlough))
         this.Demands.add(newFurlough);
   }
   
   /** @pdGenerated default remove
     * @param oldFurlough */
   public void removeDemands(Furlough oldFurlough) {
      if (oldFurlough == null)
         return;
      if (this.Demands != null)
         if (this.Demands.contains(oldFurlough))
            this.Demands.remove(oldFurlough);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllDemands() {
      if (Demands != null)
         Demands.clear();
   }

@Override
public Long getIpersonId() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public String getIpersonLastname() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public String getIpersonFirstname() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public Date getIpersonBirthday() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public String getIpersonCity() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public String getIpersonNationalcardid() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public String getIpersonEmail() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public String getIpersonPhone() {
	// TODO Auto-generated method stub
	return null;
}

}