package org.dev.dao;

import java.util.List;

import org.dev.entities.Function;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FunctionRepository extends JpaRepository<Function, Long> {
	public List<Function> findByfunctionLabel(String functionLabel);
	@Query("select a from Function a where a.functionLabel like :x")
	public Page<Function> searchFunctions(@Param("x")String mc, Pageable pageable);
}