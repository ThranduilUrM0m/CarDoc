package org.dev.entities;
/***********************************************************************
 * Module:  Picture.java
 * Author:  Zakariae
 * Purpose: Defines the Class Picture
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@pictureId")
public class Picture  implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long pictureId;
   @Column(length=100)
   protected String pictureName;
   @Column(length=10)
   protected String pictureExtension;
   protected java.util.Date insertDate;
   
   @ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
   protected Account account;
   
   public Long getPictureId() {
      return pictureId;
   }
   public void setPictureId(Long newPictureId) {
      pictureId = newPictureId;
   }
   
   public String getPictureExtension() {
      return pictureExtension;
   }
   public void setPictureExtension(String newPictureExtension) {
      pictureExtension = newPictureExtension;
   }
   
	public String getPictureName() {
		return pictureName;
	}
	public void setPictureName(String pictureName) {
		this.pictureName = pictureName;
	}
	public java.util.Date getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(java.util.Date insertDate) {
		this.insertDate = insertDate;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	
	public Picture() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Picture(String pictureName, String pictureExtension, Date insertDate, Account account) {
		super();
		this.pictureName = pictureName;
		this.pictureExtension = pictureExtension;
		this.insertDate = insertDate;
		this.account = account;
	}
	
}