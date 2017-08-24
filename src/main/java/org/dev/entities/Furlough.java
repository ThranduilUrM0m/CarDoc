package org.dev.entities;
/***********************************************************************
 * Module:  Furlough.java
 * Author:  Zakariae
 * Purpose: Defines the Class Furlough
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
public class Furlough implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long furloughId;
   protected java.util.Date furloughDatebegin;
   protected java.util.Date furloughDateend;
   protected boolean furloughJustified;
   
   @Column(name = "employeeId")
   private long employeeId;
   @ManyToOne(optional=false) @JoinColumn(name="employeeId", referencedColumnName="employeeId")
   protected Employee demandedBy;
   
   public Long getFurloughId() {
      return furloughId;
   }
   public void setFurloughId(Long newFurloughId) {
      furloughId = newFurloughId;
   }
   
   public java.util.Date getFurloughDatebegin() {
      return furloughDatebegin;
   }
   public void setFurloughDatebegin(java.util.Date newFurloughDatebegin) {
      furloughDatebegin = newFurloughDatebegin;
   }
   
   public java.util.Date getFurloughDateend() {
      return furloughDateend;
   }
   public void setFurloughDateend(java.util.Date newFurloughDateend) {
      furloughDateend = newFurloughDateend;
   }
   
   public boolean getFurloughJustified() {
      return furloughJustified;
   }
   public void setFurloughJustified(boolean newFurloughJustified) {
      furloughJustified = newFurloughJustified;
   }
   
   public Furlough(Long furloughId, java.util.Date furloughDatebegin, java.util.Date furloughDateend, boolean furloughJustified) {
	   this.setFurloughId(furloughId);
	   this.setFurloughDatebegin(furloughDatebegin);
	   this.setFurloughDateend(furloughDateend);
	   this.setFurloughJustified(furloughJustified);
   }

}