package org.dev.metier;

import java.util.Collection;
import java.util.Date;

import org.dev.dao.EmployeeRepository;
import org.dev.dao.FunctionRepository;
import org.dev.dao.TvgRepository;
import org.dev.entities.Control;
import org.dev.entities.Employee;
import org.dev.entities.Function;
import org.dev.entities.Furlough;
import org.dev.entities.Tvg;
import org.dev.entities.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmployeeMetierImplementation implements EmployeeMetier{
	@Autowired
	protected EmployeeRepository employeeRep;
	@Autowired
	protected FunctionRepository functionRep;
	@Autowired
	protected TvgRepository tvgRep;
	
	@Override
	public Employee createEmployee(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday,
			String ipersonCountry, String ipersonCity, String ipersonNationalcardid, String ipersonEmail,
			String ipersonPhone, String employeeMatricule, Function function, Tvg tvg) {
		this.employeeRep.save(new Employee(
				ipersonLastname, 
				ipersonFirstname, 
				ipersonBirthday, 
				ipersonCountry, 
				ipersonCity, 
				ipersonNationalcardid, 
				ipersonEmail, 
				ipersonPhone, 
				employeeMatricule, 
				null, 
				function,
				tvg, 
				null
				));
		this.tvgRep
			.findOne(tvg.getTvgId())
				.setEmployee(this.employeeRep.findByTvg(this.tvgRep.findOne(tvg.getTvgId())));
		return this.employeeRep.findAll().get(this.employeeRep.findAll().size()-1);
	}

	@Override
	public void updateEmployee(Employee employee) {
		this.employeeRep.save(employee);
	}
	
	@Override
	public Employee getEmployee(Long ipersonId) {
		return this.employeeRep.findOne(ipersonId);
	}
	
	@Override
	public void deleteEmployee(Long ipersonId) {
		Employee employeeInDelete = this.employeeRep.findOne(ipersonId);
		this.employeeRep.delete(employeeInDelete);
	}

	@Override
	public Employee getEmployeeByipersonEmail(String ipersonEmail) {
		// TODO Auto-generated method stub
		Employee employeeInConsult = this.employeeRep.findByIpersonEmail(ipersonEmail);
		return employeeInConsult;
	}
	
}
