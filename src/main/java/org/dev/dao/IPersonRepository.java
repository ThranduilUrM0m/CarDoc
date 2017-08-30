package org.dev.dao;

import java.util.List;

import org.dev.entities.IPerson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IPersonRepository extends JpaRepository<IPerson, Long> {
	public List<IPerson> findByipersonNationalcardid(String ipersonNationalcardid);
	@Query("select a from IPerson a where a.ipersonNationalcardid like :x")
	public Page<IPerson> searchIPersons(@Param("x")String mc, Pageable pageable);
}