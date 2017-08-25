package org.dev.dao;

import java.util.List;

import org.dev.entities.ControlPoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ControlPointRepository extends JpaRepository<ControlPoint, Long> {
	public List<ControlPoint> findBycontrolpointLabel(String controlpointLabel);
	@Query("select a from ControlPoint a where a.controlpointLabel like :x")
	public Page<ControlPoint> searchControlPoints(@Param("x")String mc, Pageable pageable);
}