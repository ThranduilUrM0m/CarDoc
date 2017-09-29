package org.dev.dao;

import java.util.List;

import org.dev.entities.Control;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ControlRepository extends JpaRepository<Control, Long> {
	
}