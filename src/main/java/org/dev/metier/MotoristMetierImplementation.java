package org.dev.metier;

import java.util.Collection;
import java.util.Date;

import org.dev.dao.AccountRepository;
import org.dev.dao.MotoristRepository;
import org.dev.dao.TvgRepository;
import org.dev.dao.VehicleRepository;
import org.dev.entities.Account;
import org.dev.entities.Motorist;
import org.dev.entities.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MotoristMetierImplementation implements MotoristMetier{
	
	@Autowired
	protected AccountRepository accountRep;
	@Autowired
	protected MotoristRepository motoristRep;
	@Autowired
	protected VehicleRepository vehicleRep;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public Motorist createMotorist(String ipersonLastname, String ipersonFirstname, Date ipersonBirthday, String ipersonCountry, String ipersonCity,
			String ipersonNationalcardid, String ipersonEmail, String ipersonPhone, String motoristMatricule,
			Account account, String vehicleBrand, String vehicleType, Date vehicleFirstCirculation,
			String vehicleRegistration) {
		this.accountRep.save(new Account(
				account.getAccountLogin(),
				bCryptPasswordEncoder.encode(account.getAccountPassword()),
				account.getAccountCreationdate(),
				account.getActivated(),
				account.getConnectionHistory(),
				account.getConsultation(),
				account.getBooking(),
				account.getPicture(),
				account.getTvg(),
				account.getMotorist(),
				account.getRoles()
				));
		this.motoristRep.save(new Motorist(
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
				this.accountRep.findByAccountLogin(account.getAccountLogin())
				));
		this.vehicleRep.save(new Vehicle(
				vehicleBrand, 
				vehicleType, 
				vehicleFirstCirculation, 
				vehicleRegistration, 
				this.motoristRep.findByAccountLogin(account.getAccountLogin()),
				null
				));
		this.accountRep
			.findByAccountLogin(account.getAccountLogin())
				.setMotorist(this.motoristRep.findByAccountLogin(account.getAccountLogin()));
		this.motoristRep
			.findByAccountLogin(account.getAccountLogin())
				.setVehicle(this.vehicleRep.findByMotorist(this.motoristRep.findByAccountLogin(account.getAccountLogin())));
		return this.motoristRep.findByAccountLogin(account.getAccountLogin());
	}

	@Override
	public Motorist deleteMotorist(Motorist inMotorist) {
		Motorist motoristInDeletion = motoristRep.findOne(inMotorist.getIpersonId());
		motoristRep.delete(motoristInDeletion);
		return motoristInDeletion;
	}

	@Override
	public Motorist getMotoristByLogin(String login) {
		Motorist motoristInConsult = motoristRep.findByAccountLogin(login);
		return motoristInConsult;
	}

	@Override
	public Motorist getMotoristByIpersonEmail(String ipersonEmail) {
		Motorist motoristInConsult = motoristRep.findByIpersonEmail(ipersonEmail);
		return motoristInConsult;
	}
	
	@Override
	public Collection<Motorist> getAllMotorist() {
		Collection<Motorist> motorists = motoristRep.findAll();
		return motorists;
	}	
}
