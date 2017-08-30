package org.dev;

import java.util.Date;
import java.util.List;

import org.dev.dao.AccountRepository;
import org.dev.entities.Account;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class CarDocApplication {
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(CarDocApplication.class, args);
		AccountRepository accountRep = context.getBean(AccountRepository.class);
		accountRep.save(new Account("root", "toor", new Date(), null, null, null, null, null, null, null, null));
		List<Account> accounts = accountRep.findAll();
	}
}