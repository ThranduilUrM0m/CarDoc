package org.dev.metier;

import java.util.Collection;
import java.util.Date;

import org.dev.entities.Account;
import org.dev.entities.Control;
import org.dev.entities.Employee;
import org.dev.entities.Tvg;

public interface TVGMetier {
	public Tvg createTVG(String tvgLegalname, String tvgLegaladresse, Date tvgCreationdate, String tvgCity,
			String tvgCountry, String tvgRegion, String tvgEmail, String tvgPhone, String tvgDaystartA, String tvgDaystartB,
			String tvgDayendA, String tvgDayendB, boolean tvgAvailable,
			Collection<Employee> employee, Collection<Control> control, Account account);
	public Tvg deleteTVG(Tvg inTVG);
	public Tvg consulteTVGByLogin(String login);
	public Collection<Tvg> getAllTVG();
	public Tvg getTvg(long tvgId);
}