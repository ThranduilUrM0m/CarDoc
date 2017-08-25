package org.dev.dao;

import java.util.List;

import org.dev.entities.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	public List<Employee> findByemployeeMatricule(String employeeMatricule);
	@Query("select a from Employee a where a.employeeMatricule like :x")
	public Page<Employee> searchEmployees(@Param("x")String mc, Pageable pageable);
}