package org.dev.entities;
/***********************************************************************
 * Module:  Function.java
 * Author:  Zakariae
 * Purpose: Defines the Class Function
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid af8114b3-b5cf-446a-9c4f-3e68a5196074 */
@Entity
public class Function implements Serializable{
   /** @pdOid aa82f431-d76b-401c-bc7c-5cc17a0f7870 */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long functionId;
   /** @pdOid 865419cf-72a5-457c-9df8-00a36456a805 */
   protected String functionLabel;
   
   /** @pdOid af18f8da-bf74-4503-a646-13c69d1b6c8d */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid 81ad2e67-f502-494d-8f51-995ee3fae8f7 */
   public Long getFunctionId() {
      return functionId;
   }
   
   /** @param newFunctionId
    * @pdOid 3a35bd83-eb88-4992-8f7e-79bf88ea0b62 */
   public void setFunctionId(Long newFunctionId) {
      functionId = newFunctionId;
   }
   
   /** @pdOid a98d4893-673b-43c0-b0c8-f0af85339cff */
   public String getFunctionLabel() {
      return functionLabel;
   }
   
   /** @param newFunctionLabel
    * @pdOid 7cf4ae78-1f85-4fe0-9f57-674d87f7d7d3 */
   public void setFunctionLabel(String newFunctionLabel) {
      functionLabel = newFunctionLabel;
   }
   
   /** @param functionId 
    * @param functionLabel
    * @pdOid 7b570191-6de2-46ab-ac1d-5f2737604a2f */
   public Function(Long functionId, String functionLabel) {
      // TODO: implement
   }

}