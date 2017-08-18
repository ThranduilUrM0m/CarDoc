package org.dev.entities;
/***********************************************************************
 * Module:  IPerson.java
 * Author:  Zakariae
 * Purpose: Defines the Interface IPerson
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid 96133dd1-e34d-4694-8a20-32e034cf9bfe */
@Entity
public abstract class IPerson implements Serializable {
   /** @pdOid 55e50ae3-e3ae-44c1-999e-2211d6842d88 */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long ipersonId;
   /** @pdOid e4cb6b4d-2d92-46d9-ad72-bc17261b88f2 */
   protected String ipersonLastname;
   /** @pdOid 60066fb2-701d-4875-a981-f8a41d04746d */
   protected String ipersonFirstname;
   /** @pdOid f89a2ef2-aaa6-42e2-9f5e-11579802b506 */
   protected java.util.Date ipersonBirthday;
   /** @pdOid 28defff3-d40c-4c7d-b2ae-b5de7a05fecd */
   protected String ipersonCity;
   /** @pdOid 28758ad0-9a82-467d-9e3a-56e8e306bbda */
   protected String ipersonNationalcardid;
   /** @pdOid acf533a9-f044-4b0a-9f95-29ec7313bf9b */
   protected String ipersonEmail;
   /** @pdOid 9fc4af70-db5e-4a1a-a087-5957de177227 */
   protected String ipersonPhone;
   
   	public Long getIpersonId() {
		return ipersonId;
	}
	public void setIpersonId(Long ipersonId) {
		this.ipersonId = ipersonId;
	}
	public String getIpersonLastname() {
		return ipersonLastname;
	}
	public void setIpersonLastname(String ipersonLastname) {
		this.ipersonLastname = ipersonLastname;
	}
	public String getIpersonFirstname() {
		return ipersonFirstname;
	}
	public void setIpersonFirstname(String ipersonFirstname) {
		this.ipersonFirstname = ipersonFirstname;
	}
	public java.util.Date getIpersonBirthday() {
		return ipersonBirthday;
	}
	public void setIpersonBirthday(java.util.Date ipersonBirthday) {
		this.ipersonBirthday = ipersonBirthday;
	}
	public String getIpersonCity() {
		return ipersonCity;
	}
	public void setIpersonCity(String ipersonCity) {
		this.ipersonCity = ipersonCity;
	}
	public String getIpersonNationalcardid() {
		return ipersonNationalcardid;
	}
	public void setIpersonNationalcardid(String ipersonNationalcardid) {
		this.ipersonNationalcardid = ipersonNationalcardid;
	}
	public String getIpersonEmail() {
		return ipersonEmail;
	}
	public void setIpersonEmail(String ipersonEmail) {
		this.ipersonEmail = ipersonEmail;
	}
	public String getIpersonPhone() {
		return ipersonPhone;
	}
	public void setIpersonPhone(String ipersonPhone) {
		this.ipersonPhone = ipersonPhone;
	}

	/** @param ipersonId 
    * @param ipersonLastname 
    * @param ipersonFirstname 
    * @param ipersonBirthday 
    * @param ipersonCity 
    * @param ipersonNationalcardid 
    * @param ipersonEmail 
    * @param ipersonPhone
    * @pdOid 1da04d72-bc9d-4871-8a41-c12d48e77c93 */
   public abstract boolean createIPerson(Long ipersonId, String ipersonLastname, String ipersonFirstname, java.util.Date ipersonBirthday, String ipersonCity, String ipersonNationalcardid, String ipersonEmail, String ipersonPhone);

}