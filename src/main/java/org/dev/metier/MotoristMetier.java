package org.dev.metier;

import java.util.Collection;
import java.util.Date;

import org.dev.entities.Account;
import org.dev.entities.Motorist;

public interface MotoristMetier {
	public Motorist createMotorist(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday, String ipersonCountry, String ipersonCity,
			String ipersonNationalcardid, String ipersonEmail, String ipersonPhone, String motoristMatricule,
			Account account, String vehicleBrand, String vehicleType, Date vehicleFirstCirculation,
			String vehicleRegistration);
	public Motorist deleteMotorist(Motorist inMotorist);
	public Motorist getMotoristByLogin(String login);
	public Motorist getMotoristByIpersonEmail(String ipersonEmail);
	public Collection<Motorist> getAllMotorist();
}