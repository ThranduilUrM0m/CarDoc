package org.dev.metier;

import java.util.Date;

import org.dev.dao.VehicleRepository;
import org.dev.entities.Motorist;
import org.dev.entities.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class VehicleMetierImplementation implements VehicleMetier{
	@Autowired
	protected VehicleRepository vehicleRep;

	@Override
	public Vehicle createVehicle(String vehicleBrand, String vehicleType, Date vehicleFirstCirculation,
			String vehicleRegistration, Motorist motorist) {
		Vehicle vehicleInCreation = new Vehicle(
				vehicleBrand,
				vehicleType,
				vehicleFirstCirculation,
				vehicleRegistration,
				motorist
				);
		vehicleRep.save(vehicleInCreation);
		return vehicleInCreation;
	}

	@Override
	public java.util.Collection<Vehicle> consulteVehicles(Motorist inMotorist) {
		java.util.Collection<Vehicle> vehiclesConsulted = vehicleRep.findByMotorist(inMotorist);
		return vehiclesConsulted;
	}
}
