package org.dev.dao;

import java.util.Collection;
import java.util.List;

import org.dev.entities.Employee;
import org.dev.entities.Tvg;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	public Employee findByIpersonEmail(String ipersonEmail);
	public Collection<Employee> findByEmployeeMatricule(String employeeMatricule);
	@Query("select e from Employee e, Tvg t \r\n" + 
    		"where e.tvg.tvgId = t.tvgId\r\n" + 
    		"and t = :x")
	public Collection<Employee> findByTvg(@Param("x") Tvg tvgId);
}