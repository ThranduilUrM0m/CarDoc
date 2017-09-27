package org.dev;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

import org.dev.dao.AccountRepository;
import org.dev.dao.MotoristRepository;
import org.dev.dao.PictureRepository;
import org.dev.dao.TvgRepository;
import org.dev.dao.VehicleRepository;
import org.dev.entities.Account;
import org.dev.entities.Motorist;
import org.dev.entities.Picture;
import org.dev.entities.Tvg;
import org.dev.entities.Vehicle;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class CarDocApplication {
	public static void main(String[] args) throws ParseException {
		ApplicationContext context = SpringApplication.run(CarDocApplication.class, args);
		
		AccountRepository accountRep = context.getBean(AccountRepository.class);		
		accountRep.save(new Account("motorist", "root", new Date(), true, null, null, null, null, null, null, null, null, "ROLE_MOTORIST"));
		accountRep.save(new Account("tvg", "root", new Date(), true, null, null, null, null, null, null, null, null, "ROLE_TVG"));

		TvgRepository tvgRep = context.getBean(TvgRepository.class);
		tvgRep.save(new Tvg("CityCenter", "Marjane", (new SimpleDateFormat("dd/MM/yyyy").parse("31/03/2005")), "Meknes", "Morocco", "Fes-Meknes", "Citycenter@gmail.com", "05xxxxxxxx", "08:00", "12:00", "14:00", "18:00", true, null, null, null, accountRep.findOne((long) 2)));
		
		MotoristRepository motoristRep = context.getBean(MotoristRepository.class);
		motoristRep.save(new Motorist("Mahdaoui", "Abdessamad", (new SimpleDateFormat("dd/MM/yyyy").parse("31/03/1995")), "Meknes", "DXXXXXX", "mahdaoui21@gmail.com ", "0600456165", "Matriule", null, accountRep.findOne((long) 1)));
		
		VehicleRepository vehicleRep = context.getBean(VehicleRepository.class);
		vehicleRep.save(new Vehicle("Peaugot", "Famille", (new SimpleDateFormat("dd/MM/yyyy").parse("01/01/2015")), "RegistrationX", motoristRep.findOne((long) 1)));
		
		PictureRepository pictureRep = context.getBean(PictureRepository.class);
		pictureRep.save(new Picture("citycenter", "png", new Date(), accountRep.findOne((long) 2)));
		pictureRep.save(new Picture("motorist1", "png", new Date(), accountRep.findOne((long) 1)));
		
		accountRep.findOne((long) 2).setTvg(tvgRep.findOne((long) 1));
		accountRep.findOne((long) 2).setPicture(pictureRep.findByAccount(accountRep.findOne((long) 2)));
		accountRep.findOne((long) 1).setPicture(pictureRep.findByAccount(accountRep.findOne((long) 1)));
		accountRep.findOne((long) 1).setMotorist(motoristRep.findOne((long) 1));
		motoristRep.findOne((long) 1).setVehicle(vehicleRep.findByVehicleId((long) 1));
	}
}