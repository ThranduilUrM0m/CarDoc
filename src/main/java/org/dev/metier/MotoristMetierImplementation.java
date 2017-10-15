package org.dev.metier;

import java.util.Collection;
import java.util.Date;

import org.dev.dao.AccountRepository;
import org.dev.dao.MotoristRepository;
import org.dev.dao.TvgRepository;
import org.dev.dao.VehicleRepository;
import org.dev.entities.Account;
import org.dev.entities.Motorist;
import org.dev.entities.Tvg;
import org.dev.entities.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MotoristMetierImplementation implements MotoristMetier{
	@Autowired
	protected MotoristRepository motoristRep;
	@Autowired
	protected AccountRepository accountRep;
	@Autowired
	protected VehicleMetier iVehicleMetier;

	@Override
	public Motorist createMotorist(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday, String ipersonCountry, String ipersonCity,
			String ipersonNationalcardid, String ipersonEmail, String ipersonPhone, String motoristMatricule,
			Account account, String vehicleBrand, String vehicleType, Date vehicleFirstCirculation,
			String vehicleRegistration) {
		// TODO Auto-generated method stub
		Account accountInCreation = new Account(
				account.getAccountLogin(),
				account.getAccountPassword(),
				account.getAccountCreationdate(),
				account.getActivated(),
				account.getConnectionHistory(),
				account.getConsultation(),
				account.getBooking(),
				account.getPicture(),
				account.getMessageSent(),
				account.getMessageReceived(),
				account.getTvg(),
				account.getMotorist(),
				account.getRoles()
				);
		Motorist motoristInCreation = new Motorist(
				ipersonLastname,
				ipersonFirstname,
				ipersonBirthday,
				ipersonCountry,
				ipersonCity,
				ipersonNationalcardid,
				ipersonEmail,
				ipersonPhone,
				motoristMatricule,
				null,
				accountInCreation
				);
		accountInCreation.setMotorist(motoristInCreation);
		accountRep.save(accountInCreation);
		motoristRep.save(motoristInCreation);
		Vehicle vehicleInCreation = iVehicleMetier.createVehicle(vehicleBrand, vehicleType, vehicleFirstCirculation, vehicleRegistration, motoristInCreation);
		motoristInCreation.setVehicle(iVehicleMetier.consulteVehicles(motoristInCreation));
		return motoristInCreation;
	}

	@Override
	public Motorist deleteTVG(Motorist inMotorist) {
		Motorist motoristInDeletion = motoristRep.findOne(inMotorist.getIpersonId());
		motoristRep.delete(motoristInDeletion);
		return motoristInDeletion;
	}

	@Override
	public Motorist consulteMotoristByLogin(String login) {
		Motorist motoristInConsult = motoristRep.findByAccountLogin(login);
		return motoristInConsult;
	}

}
