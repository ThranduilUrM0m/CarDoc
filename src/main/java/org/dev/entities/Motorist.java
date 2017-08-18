package org.dev.entities;
/***********************************************************************
 * Module:  Motorist.java
 * Author:  Zakariae
 * Purpose: Defines the Class Motorist
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

/** @pdOid 92b93040-ded8-47d8-a5e0-685380e42822 */
public class Motorist extends IPerson implements Serializable {
   /** @pdOid ce954004-608c-460c-8428-8e9d825f6cc4 */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid 16e95620-9ca6-41e8-8357-7784097e0fba */
   public Motorist() {
      // TODO: implement
   }
   
   /** @param ipersonId 
    * @param ipersonLastname 
    * @param ipersonFirstname 
    * @param ipersonBirthday 
    * @param ipersonCity 
    * @param ipersonNationalcardid 
    * @param ipersonEmail 
    * @param ipersonPhone
    * @pdOid 4966e850-ecb1-4503-a3ff-74257b890fc4 */
   public boolean createIPerson(Long ipersonId, String ipersonLastname, String ipersonFirstname, java.util.Date ipersonBirthday, String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone) {
      // TODO: implement
      return false;
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