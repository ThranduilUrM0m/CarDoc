package org.dev.dao;

import java.util.Collection;

import org.dev.entities.Motorist;
import org.dev.entities.Tvg;
import org.dev.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
	public Collection<Vehicle> findByVehicleId(Long vehicleId);
	@Query("select v from Vehicle v, Motorist m \r\n" + 
    		"where v.motorist.motoristMatricule = m.motoristMatricule\r\n" + 
    		"and m = :x")
    public Collection<Vehicle> findByMotorist(@Param("x") Motorist motoristMatricule);
}