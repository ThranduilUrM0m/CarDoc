package org.dev.metier;

import java.util.Collection;
import java.util.Date;

import org.dev.entities.Control;
import org.dev.entities.Employee;
import org.dev.entities.Function;
import org.dev.entities.Furlough;
import org.dev.entities.Tvg;

public interface EmployeeMetier {
	public Employee createEmployee(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday,
			String ipersonCountry, String ipersonCity, String ipersonNationalcardid, String ipersonEmail,
			String ipersonPhone, String employeeMatricule, Function function, Tvg tvg);
	public void updateEmployee(Employee employee);
	public Employee getEmployee(Long ipersonId);
	public void deleteEmployee(Long ipersonId);
	public Employee getEmployeeByipersonEmail(String ipersonEmail);
}