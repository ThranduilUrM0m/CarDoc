package org.dev.dao;

import java.util.List;

import org.dev.entities.Motorist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ROLE_ACCOUNT')")
public interface MotoristRepository extends JpaRepository<Motorist, Long> {
	
}