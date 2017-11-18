package org.dev.metier;

import java.util.Date;

import org.dev.dao.MotoristRepository;
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
	@Autowired
	protected MotoristRepository motoristRep;
	
	@Override
	public Vehicle createVehicle(String vehicleBrand, String vehicleType, Date vehicleFirstCirculation,
			String vehicleRegistration, Motorist motorist) {
		this.vehicleRep.save(new Vehicle(
				vehicleBrand, 
				vehicleType, 
				vehicleFirstCirculation, 
				vehicleRegistration, 
				motorist
				));
		this.motoristRep
			.findOne(motorist.getIpersonId())
				.setVehicle(this.vehicleRep.findByMotorist(this.motoristRep.findOne(motorist.getIpersonId())));
		return this.vehicleRep.findAll().get(this.vehicleRep.findAll().size()-1);
	}

	@Override
	public void updateVehicle(Vehicle vehicle) {
		this.vehicleRep.save(vehicle);
	}

	@Override
	public Vehicle getVehicle(Long vehicleId) {
		return this.vehicleRep.findOne(vehicleId);
	}

	@Override
	public void deleteVehicle(Long vehicleId) {
		Vehicle vehicleInDeletion = this.vehicleRep.findOne(vehicleId);
		this.vehicleRep.delete(vehicleInDeletion);
	}

}
