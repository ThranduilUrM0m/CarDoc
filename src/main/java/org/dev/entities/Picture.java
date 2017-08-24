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
   
   @Column(name = "accountId")
   private long accountId;
   @ManyToOne(optional=false) @JoinColumn(name="accountId", referencedColumnName="accountId")
   protected Account belongsToAccount;
   
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
	
	public Picture(Long pictureId, String pictureContent, String pictureExtension, boolean isLatest) {
		super();
		this.pictureId = pictureId;
		this.pictureContent = pictureContent;
		this.pictureExtension = pictureExtension;
		this.isLatest = isLatest;
	}
   
}