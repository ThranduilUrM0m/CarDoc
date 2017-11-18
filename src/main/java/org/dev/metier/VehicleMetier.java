package org.dev.metier;

import java.util.Date;

import org.dev.entities.Motorist;
import org.dev.entities.Vehicle;

public interface VehicleMetier {
	public Vehicle getVehicle(Long vehicleId);
	public Vehicle createVehicle(String vehicleBrand, String vehicleType, Date vehicleFirstCirculation,
			String vehicleRegistration, Motorist motorist);
	public void updateVehicle(Vehicle vehicle);
	public void deleteVehicle(Long vehicleId);
}