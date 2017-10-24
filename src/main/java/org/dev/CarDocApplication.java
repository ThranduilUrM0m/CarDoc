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
		SpringApplication.run(CarDocApplication.class, args);
	}
}