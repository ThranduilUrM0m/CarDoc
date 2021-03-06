package org.dev.dao;

import java.util.List;

import org.dev.entities.ConnectionHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConnectionHistoryRepository extends JpaRepository<ConnectionHistory, Long> {
	
}