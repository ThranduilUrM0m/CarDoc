package org.dev.dao;

import java.util.List;

import org.dev.entities.Consultation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
	public List<Consultation> findByconsultationId(Long consultationId);
	@Query("select a from Consultation a where a.consultationId like :x")
	public Page<Consultation> searchConsultations(@Param("x")String mc, Pageable pageable);
}