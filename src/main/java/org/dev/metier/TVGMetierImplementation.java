package org.dev.metier;

import java.util.Collection;
import java.util.Date;

import org.dev.dao.AccountRepository;
import org.dev.dao.TvgRepository;
import org.dev.entities.Account;
import org.dev.entities.Control;
import org.dev.entities.Employee;
import org.dev.entities.Tvg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TVGMetierImplementation implements TVGMetier {
	@Autowired
	protected TvgRepository tvgRep;
	@Autowired
	protected AccountRepository accountRep;
	
	@Override
	public Tvg createTVG(String tvgLegalname, String tvgLegaladresse, Date tvgCreationdate, String tvgCity,
			String tvgCountry, String tvgRegion, String tvgEmail, String tvgPhone, String tvgDaystartA,
			String tvgDaystartB, String tvgDayendA, String tvgDayendB, boolean tvgAvailable,
			Collection<Employee> employee, Collection<Control> control, Account account) {
		// TODO Auto-generated method stub
		Account accountInCreation = new Account(account.getAccountLogin(),
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
		Tvg tvgInCreation = new Tvg(tvgLegaladresse, 
									tvgLegaladresse, 
									tvgCreationdate, 
									tvgCity, 
									tvgCountry, 
									tvgRegion, 
									tvgEmail, 
									tvgPhone, 
									tvgDaystartA, 
									tvgDaystartB, 
									tvgDayendA, 
									tvgDayendB, 
									tvgAvailable, 
									employee, 
									control, 
									accountInCreation);
		accountInCreation.setTvg(tvgInCreation);
		accountRep.save(accountInCreation);
		tvgRep.save(tvgInCreation);
		return tvgInCreation;
	}

	@Override
	public Tvg deleteTVG(Tvg inTVG) {
		Tvg tvgInDeletion = tvgRep.findOne(inTVG.getTvgId());
		tvgRep.delete(tvgInDeletion);
		return tvgInDeletion;
	}

	@Override
	public Tvg consulteTVGByLogin(String login) {
		Tvg tvgInConsult = tvgRep.findByAccountLogin(login);
		return tvgInConsult;
	}

	@Override
	public Collection<Tvg> getAllTVG() {
		Collection<Tvg> tvgs = tvgRep.findAll();
		return tvgs;
	}	
}