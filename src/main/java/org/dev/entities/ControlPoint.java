package org.dev.entities;
/***********************************************************************
 * Module:  ControlPoint.java
 * Author:  Zakariae
 * Purpose: Defines the Class ControlPoint
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid 91dbed14-3f7d-497f-8a46-bd609f9536ec */
@Entity
public class ControlPoint implements Serializable{
   /** @pdOid 75e3e4c0-ec4e-4b6a-8111-30b4a2bb39e8 */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long controlpointId;
   /** @pdOid af93e592-7630-4ceb-a9f2-063896693221 */
   protected String controlpointLabel;
   /** @pdOid 6e842cad-3714-4015-9f6f-8f1e10b242e9 */
   protected String controlpointError;
   
   /** @pdOid 9cf78c63-e0a6-437e-a7dc-d9b51e31429d */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @pdOid 6f69bbc3-4010-4b83-8c49-e442b545dcd4 */
   public Long getControlpointId() {
      return controlpointId;
   }
   
   /** @param newControlpointId
    * @pdOid 97d1c771-9dde-46dd-bb9e-6da76598c946 */
   public void setControlpointId(Long newControlpointId) {
      controlpointId = newControlpointId;
   }
   
   /** @pdOid 58e53c2b-ee53-4628-b132-e12d25832586 */
   public String getControlpointLabel() {
      return controlpointLabel;
   }
   
   /** @param newControlpointLabel
    * @pdOid ecf17995-7ba7-4a42-a377-057126504f07 */
   public void setControlpointLabel(String newControlpointLabel) {
      controlpointLabel = newControlpointLabel;
   }
   
   /** @pdOid c166cc76-e34c-470e-916c-4e78a1a10ab2 */
   public String getControlpointError() {
      return controlpointError;
   }
   
   /** @param newControlpointError
    * @pdOid 13979dcf-aec5-4501-a53b-923162580786 */
   public void setControlpointError(String newControlpointError) {
      controlpointError = newControlpointError;
   }
   
   /** @param controlpointId 
    * @param controlpointLabel 
    * @param controlpointError
    * @pdOid e19291a2-6ff2-444e-bd80-5432b0573cb8 */
   public ControlPoint(Long controlpointId, String controlpointLabel, String controlpointError) {
      // TODO: implement
   }

}