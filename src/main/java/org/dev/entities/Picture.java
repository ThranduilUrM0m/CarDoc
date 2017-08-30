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

@Entity
public class Picture  implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long pictureId;
   @Column(columnDefinition = "TEXT")
   protected String pictureContent;
   @Column(length=100)
   protected String pictureExtension;
   protected boolean isLatest;
   
   @ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
   protected Account account;
   
   public Long getPictureId() {
      return pictureId;
   }
   public void setPictureId(Long newPictureId) {
      pictureId = newPictureId;
   }
   
   public String getPictureContent() {
      return pictureContent;
   }
   public void setPictureContent(String newPictureContent) {
      pictureContent = newPictureContent;
   }
   
   public String getPictureExtension() {
      return pictureExtension;
   }
   public void setPictureExtension(String newPictureExtension) {
      pictureExtension = newPictureExtension;
   }
   public boolean isLatest() {
		return isLatest;
	}
	public void setLatest(boolean isLatest) {
		this.isLatest = isLatest;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public Picture(String pictureContent, String pictureExtension, boolean isLatest, Account account) {
		super();
		this.pictureContent = pictureContent;
		this.pictureExtension = pictureExtension;
		this.isLatest = isLatest;
		this.account = account;
	}
	
}