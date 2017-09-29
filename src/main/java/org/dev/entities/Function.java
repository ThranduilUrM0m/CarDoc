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

   @OneToMany(mappedBy="function", targetEntity=Employee.class)
   protected java.util.Collection<Employee> employee;
   
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
public java.util.Collection<Employee> getEmployee() {
	return employee;
}
public void setEmployee(java.util.Collection<Employee> employee) {
	this.employee = employee;
}

public Function() {
	super();
	// TODO Auto-generated constructor stub
}
public Function(String functionLabel, Collection<Employee> employee) {
	super();
	this.functionLabel = functionLabel;
	this.employee = employee;
}
}