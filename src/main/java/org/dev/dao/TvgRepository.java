package org.dev.dao;

import java.util.List;

import org.dev.entities.Tvg;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TvgRepository extends JpaRepository<Tvg, Long> {
	public List<Tvg> findBytvgLegalname(String tvgLegalname);
	@Query("select a from Tvg a where a.tvgLegalname like :x")
	public Page<Tvg> searchTvgs(@Param("x")String mc, Pageable pageable);
}