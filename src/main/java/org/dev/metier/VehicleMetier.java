package org.dev.metier;

import java.util.Date;

import org.dev.entities.Vehicle;
import org.dev.entities.Motorist;

public interface VehicleMetier {
	public Vehicle createVehicle(String vehicleBrand, String vehicleType, Date vehicleFirstCirculation,
			String vehicleRegistration, Motorist motorist);
	public java.util.Collection<Vehicle> consulteVehicles(Motorist inMotorist);
}