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
	protected final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	public DatabaseLoader(	AccountRepository accountRep, 
							TvgRepository tvgRep,
							MotoristRepository motoristRep,
							VehicleRepository vehicleRep,
							BookingRepository bookingRep,
							BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.accountRep = accountRep;
		this.tvgRep = tvgRep;
		this.motoristRep = motoristRep;
		this.vehicleRep = vehicleRep;
		this.bookingRep = bookingRep;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	public void run(String... strings) throws Exception {
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-dd hh:mm:ss");
//		this.accountRep.save(new Account("motorist", bCryptPasswordEncoder.encode("root1234"), new java.sql.Date(Calendar.getInstance().getTime().getTime()), true, null, null, null, null, null, null, "ROLE_MOTORIST"));
//		this.accountRep.save(new Account("tvgCenter", bCryptPasswordEncoder.encode("root4321"), new java.sql.Date(Calendar.getInstance().getTime().getTime()), true, null, null, null, null, null, null, "ROLE_TVG"));
//		this.tvgRep.save(new Tvg("CityCenter", "Marjane", sdf.parse("2005-03-31 10:20:56"), "Meknès", "MA", "Fès-Meknès", "Citycenter@gmail.com", "05xxxxxxxx", "08:00", "12:00", "14:00", "18:00", true, null, null, accountRep.findOne((long) 2), null));
//		this.motoristRep.save(new Motorist("Mahdaoui", "Abdessamad", sdf.parse("1995-03-31 00:00:00"), "MA", "Meknes", "DXXXXXX", "mahdaoui21@gmail.com", "0600456165", "Matricule", null, accountRep.findOne((long) 1)));
//		this.vehicleRep.save(new Vehicle("Peaugot", "Car (Light vehicles)", sdf.parse("2015-01-01 00:00:00"), "RegistrationX", motoristRep.findOne((long) 1), null));
//		this.vehicleRep.save(new Vehicle("Reanult", "Car (Light vehicles)", sdf.parse("2015-10-10 00:00:00"), "RegistrationY", motoristRep.findOne((long) 1), null));
//		this.accountRep.findOne((long) 2).setTvg(tvgRep.findOne((long) 1));
//		this.accountRep.findOne((long) 1).setMotorist(motoristRep.findOne((long) 1));
//		this.motoristRep.findOne((long) 1).setVehicle(vehicleRep.findByVehicleId((long) 1));
//		this.bookingRep.save(new Booking(sdf.parse("2017-12-05 00:00:00"), new java.sql.Date(Calendar.getInstance().getTime().getTime()), false, accountRep.findOne((long) 1), vehicleRep.findOne((long) 1), null, null, tvgRep.findOne((long) 1)));
	}
}