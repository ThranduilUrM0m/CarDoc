package org.dev.dbload;

import org.dev.dao.*;
import org.dev.entities.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	protected final AccountRepository accountRep;
	protected final TvgRepository tvgRep;
	protected final MotoristRepository motoristRep;
	protected final VehicleRepository vehicleRep;
	protected final BookingRepository bookingRep;
	protected final EmployeeRepository employeeRep;
	protected final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	public DatabaseLoader(	AccountRepository accountRep, 
							TvgRepository tvgRep,
							MotoristRepository motoristRep,
							VehicleRepository vehicleRep,
							BookingRepository bookingRep,
							EmployeeRepository employeeRep,
							BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.accountRep = accountRep;
		this.tvgRep = tvgRep;
		this.motoristRep = motoristRep;
		this.vehicleRep = vehicleRep;
		this.bookingRep = bookingRep;
		this.employeeRep = employeeRep;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	public void run(String... strings) throws Exception {
		
	}
}