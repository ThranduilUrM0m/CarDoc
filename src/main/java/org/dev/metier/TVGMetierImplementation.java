package org.dev.metier;

import java.util.Calendar;
import java.util.Collection;
import java.util.Date;

import org.dev.dao.AccountRepository;
import org.dev.dao.EmployeeRepository;
import org.dev.dao.FunctionRepository;
import org.dev.dao.TvgRepository;
import org.dev.entities.Account;
import org.dev.entities.Control;
import org.dev.entities.Employee;
import org.dev.entities.Tvg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TVGMetierImplementation implements TVGMetier{
	
	@Autowired
	protected TvgRepository tvgRep;
	@Autowired
	protected AccountRepository accountRep;
	@Autowired
	protected EmployeeRepository employeeRep;
	@Autowired
	protected FunctionRepository functionRep;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public Tvg createTVG(String tvgLegalname, String tvgLegaladresse, Date tvgCreationdate, String tvgCity,
			String tvgCountry, String tvgRegion, String tvgEmail, String tvgPhone, String tvgDaystartA,
			String tvgDaystartB, String tvgDayendA, String tvgDayendB, boolean tvgAvailable,
			Collection<Employee> employee, Collection<Control> control, Account account) {
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
		this.tvgRep.save(new Tvg(
				tvgLegalname, 
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
				this.accountRep.findByAccountLogin(account.getAccountLogin()),
				account.getBooking()
				));
		this.employeeRep.save(new Employee(
				"Administrator", 
				"Administrator", 
				new java.sql.Date(Calendar.getInstance().getTime().getTime()), 
				tvgCountry, 
				tvgCity, 
				"0000000", 
				tvgEmail, 
				tvgPhone, 
				"EM_ADMIN", 
				null, 
				this.functionRep.findByFunctionLabel("Administrateur"),
				this.tvgRep.findByAccountLogin(account.getAccountLogin()),
				null
				));
		this.accountRep
			.findByAccountLogin(account.getAccountLogin())
				.setTvg(this.tvgRep.findByAccountLogin(account.getAccountLogin()));
		this.tvgRep
			.findByAccountLogin(account.getAccountLogin())
				.setEmployee(this.employeeRep.findByTvg(this.tvgRep.findByAccountLogin(account.getAccountLogin())));
		return this.tvgRep.findByAccountLogin(account.getAccountLogin());
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
	public Tvg consulteTVGByEmail(String tvgEmail) {
		Tvg tvgInConsult = tvgRep.findByTvgEmail(tvgEmail);
		return tvgInConsult;
	}
	
	@Override
	public Collection<Tvg> getAllTVG() {
		Collection<Tvg> tvgs = tvgRep.findAll();
		return tvgs;
	}
	
	@Override
	public Tvg getTvg(long tvgId) {
		return this.tvgRep.findOne(tvgId);
	}
}