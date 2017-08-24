package org.dev.entities;
/***********************************************************************
 * Module:  ControlPoint.java
 * Author:  Zakariae
 * Purpose: Defines the Class ControlPoint
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
public class ControlPoint implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long controlpointId;
   @Column(length=40)
   protected String controlpointLabel;
   @Column(length=40)
   protected String controlpointError;
   
   @Column(name = "controlId")
   private long controlId;
   @ManyToOne(optional=false) @JoinColumn(name="controlId", referencedColumnName="controlId")
   protected Control belongsToControl;
   
   public Long getControlpointId() {
      return controlpointId;
   }
   public void setControlpointId(Long newControlpointId) {
      controlpointId = newControlpointId;
   }
   
   public String getControlpointLabel() {
      return controlpointLabel;
   }
   public void setControlpointLabel(String newControlpointLabel) {
      controlpointLabel = newControlpointLabel;
   }
   
   public String getControlpointError() {
      return controlpointError;
   }
   public void setControlpointError(String newControlpointError) {
      controlpointError = newControlpointError;
   }
   
   	public Control getBelongsToControl() {
		return belongsToControl;
	}
	public void setBelongsToControl(Control belongsToControl) {
		this.belongsToControl = belongsToControl;
	}
	
	public ControlPoint(Long controlpointId, String controlpointLabel, String controlpointError) {
		this.setControlpointId(controlpointId);
		this.setControlpointLabel(controlpointLabel);
		this.setControlpointError(controlpointError);
		this.setBelongsToControl(belongsToControl);
	}
}