package org.dev.dao;

import java.util.Collection;

import org.dev.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
	public Collection<Vehicle> findByVehicleId(Long vehicleId);
}