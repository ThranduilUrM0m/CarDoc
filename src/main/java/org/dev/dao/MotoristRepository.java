package org.dev.dao;

import org.dev.entities.Motorist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotoristRepository extends JpaRepository<Motorist, Long> {
	
}