package org.dev.dao;

import java.util.List;

import org.dev.entities.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
	public List<Vehicle> findByvehicleBrand(String vehicleBrand);
	@Query("select a from Vehicle a where a.vehicleBrand like :x")
	public Page<Vehicle> searchVehicles(@Param("x")String mc, Pageable pageable);
}