package org.dev.dao;

import java.util.Date;
import java.util.List;

import org.dev.entities.Furlough;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FurloughRepository extends JpaRepository<Furlough, Long> {
	public List<Furlough> findByfurloughDatebegin(Date furloughDatebegin);
	@Query("select a from Furlough a where a.furloughDatebegin like :x")
	public Page<Furlough> searchFurloughs(@Param("x")String mc, Pageable pageable);
}