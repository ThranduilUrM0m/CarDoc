package org.dev.entities;
/***********************************************************************
 * Module:  Vehicle.java
 * Author:  Zakariae
 * Purpose: Defines the Class Vehicle
 ***********************************************************************/

import java.io.Serializable;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** @pdOid dd45b902-b1c6-4628-bd98-db3e28b1ed2f */
@Entity
public class Vehicle implements Serializable {
   /** @pdOid c5ea91ca-09b7-4de8-b208-04538d44101d */
   @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   protected Long vehicleId;
   /** @pdOid b5478a0d-28af-4bd5-908d-d83d9d862404 */
   protected String vehicleBrand;
   /** @pdOid 97b8d2e9-20dd-41a2-b0e2-438ee35d9cb6 */
   protected String vehicleType;
   /** @pdOid d4370e33-37a2-484a-8bb7-07f7b9766257 */
   protected java.util.Date vehicleFirstCirculation;
   /** @pdOid d85f4472-2c4b-49c0-b9f4-30963bf2dacb */
   protected String vehicleRegistration;
   
   /** @pdOid db0921ca-89f5-400b-b1ef-11e8ca7f9a79 */
   protected void finalize() {
      // TODO: implement
   }
   
   /** @param vehicleId 
    * @param vehicleBrand 
    * @param vehicleType 
    * @param vehicleFirstCirculation 
    * @param vehicleRegistration
    * @pdOid ac51927c-d03f-4fa2-a350-c05581c96fea */
   public Vehicle(Long vehicleId, String vehicleBrand, String vehicleType, java.util.Date vehicleFirstCirculation, String vehicleRegistration) {
      // TODO: implement
   }

public Long getVehicleId() {
	return vehicleId;
}

public void setVehicleId(Long vehicleId) {
	this.vehicleId = vehicleId;
}

public String getVehicleBrand() {
	return vehicleBrand;
}

public void setVehicleBrand(String vehicleBrand) {
	this.vehicleBrand = vehicleBrand;
}

public String getVehicleType() {
	return vehicleType;
}

public void setVehicleType(String vehicleType) {
	this.vehicleType = vehicleType;
}

public java.util.Date getVehicleFirstCirculation() {
	return vehicleFirstCirculation;
}

public void setVehicleFirstCirculation(java.util.Date vehicleFirstCirculation) {
	this.vehicleFirstCirculation = vehicleFirstCirculation;
}

public String getVehicleRegistration() {
	return vehicleRegistration;
}

public void setVehicleRegistration(String vehicleRegistration) {
	this.vehicleRegistration = vehicleRegistration;
}
   
}