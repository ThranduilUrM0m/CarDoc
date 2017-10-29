package org.dev;

import java.text.ParseException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CarDocApplication {
	public static void main(String[] args) throws ParseException {
		SpringApplication.run(CarDocApplication.class, args);
	}
}