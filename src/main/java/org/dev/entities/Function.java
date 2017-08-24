package org.dev.entities;
/***********************************************************************
 * Module:  Function.java
 * Author:  Zakariae
 * Purpose: Defines the Class Function
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Function implements Serializable{
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(nullable = false)
   protected Long functionId;
   @Column(length=40)
   protected String functionLabel;

   @OneToMany(mappedBy="Function",targetEntity=Employee.class, fetch=FetchType.EAGER)
   protected java.util.Collection<Employee> employeesByFunction;
   
   public Long getFunctionId() {
      return functionId;
   }
   public void setFunctionId(Long newFunctionId) {
      functionId = newFunctionId;
   }
   
   public String getFunctionLabel() {
      return functionLabel;
   }
   public void setFunctionLabel(String newFunctionLabel) {
      functionLabel = newFunctionLabel;
   }
   
   public Function(Long functionId, String functionLabel) {
	   this.setFunctionId(functionId);
	   this.setFunctionLabel(functionLabel);
   }

}