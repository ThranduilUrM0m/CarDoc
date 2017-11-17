package org.dev.web;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.dev.dao.VehicleRepository;
import org.dev.entities.Account;
import org.dev.entities.Motorist;
import org.dev.entities.Tvg;
import org.dev.mail.MailSender;
import org.dev.metier.AccountMetier;
import org.dev.metier.MotoristMetier;
import org.dev.metier.TVGMetier;
import org.hibernate.validator.constraints.Email;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FormsController {
	@Autowired 
	private HttpSession httpSession;
    @Autowired
    private TVGMetier iTVGMetier;
    @Autowired
    private MotoristMetier iMotoristMetier;
    @Autowired
    private AccountMetier iAccountMetier;
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");
        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");
        return "login";
    }
    
    @RequestMapping(value = "/validateEmail", method = RequestMethod.GET)
	public void validateEmail(String accountLogin) {
        try{
        	SecurityContextHolder.clearContext();
        	Account accountValidated = iAccountMetier.getAccountByUsername(accountLogin);
        	accountValidated.setActivated(true);
        	iAccountMetier.updateAccount(accountValidated);
        }
        catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
	}
    
    @RequestMapping(value = "/authRedirection", method = RequestMethod.POST)
    public void redirect(HttpServletResponse response) throws IOException {
    	SecurityContextHolder.clearContext();
		response.sendRedirect("/success?incoming=activate");
    }
    
    @RequestMapping(value = "/auth", method = RequestMethod.GET)
    public Account getLogged() throws IOException{
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	Account accountLogged = iAccountMetier.getAccountByUsername(auth.getName());
    	return accountLogged;
    }
    
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
    public void saveAccount(Model model, 	@RequestParam(name = "login", required = true) String login, 
    										@RequestParam(name = "passwordnew", required = true) String passwordnew, 
    										@RequestParam(name = "signupas", required = true) String signupas,
    										HttpServletResponse response) throws IOException {
        try {
        	if(login.equals(passwordnew) || login.length() < 6 || passwordnew.length() < 6 || (!signupas.toLowerCase().equals("motorist") && !signupas.toLowerCase().equals("tvg")))
        		response.sendRedirect("/?error=invalidForm");
        	else {
        		Tvg tvgInConsult = iTVGMetier.consulteTVGByLogin(login);
        		if(tvgInConsult != null) {
        			response.sendRedirect("/?error=repeatedLogin");
        		}else {
        			httpSession.setAttribute("login", login);
                	httpSession.setAttribute("password", passwordnew);
                	httpSession.setAttribute("signupas", signupas);
                	response.sendRedirect("/register");
        		}
        	}
        } catch (Exception e) {
        	model.addAttribute("error", e);
        	response.sendRedirect("/?errorcatched=" + e.getMessage());
        }
    }
	
	@RequestMapping(value = "/sessionLP", method = RequestMethod.GET)
	public String sessionLP() {
		try {
			JSONObject obj = new JSONObject();
			obj.put("login", httpSession.getAttribute("login"));
			obj.put("password", httpSession.getAttribute("password"));
			obj.put("signupas", httpSession.getAttribute("signupas"));
			return obj.toString();
		} catch (Exception e) {
			return e.getMessage();
		}
	}
    
	@Autowired @Qualifier("zakariaeboutaleb@gmail.com")
	public MailSender mailSender;
	
	@RequestMapping(value = "/emailvalidation", method = RequestMethod.POST)
	public void emailValidation(Account account, String email) {
        try{
        	String body = "Dear " + account.getAccountLogin()
            + ", thank you for placing your trust in us, "
            + "Please refer to the link below to activate your account "
            + "localhost:8080/success?incoming="+account.getToken();
        	mailSender.sendMail("zakariaeboutaleb@gmail.com", email, "Validation email", body);
			httpSession.removeAttribute("login");
			httpSession.removeAttribute("password");
			httpSession.removeAttribute("signupas");
        }
        catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
	}

	protected String error ;
	public boolean isValidDateStr(String date) {
		Date testDate = null;
		Boolean testDateB = false;
		try{
		    testDate = new SimpleDateFormat("YYYY-MM-DD").parse(date);
		    try {
		    	testDateB = new SimpleDateFormat("YYYY-MM-DD").format(testDate).equals(date);
				return true;
		    } catch(Exception e) {
		    	error = e.getMessage();
			    return false;
		    }
		} catch (Exception e){
			error = e.getMessage();
		    return false;
		}
	}
	
	@RequestMapping(value = "/signuptvg", method = RequestMethod.POST)
	public void saveTvg(Model model, 	@RequestParam(name = "login", required = true) String login, 
										@RequestParam(name = "password", required = true) String password, 
										@RequestParam(name = "signupas", required = true) String signupas,
										@RequestParam(name = "tvgLegalname", required = true) String tvgLegalname,
										@RequestParam(name = "tvgLegaladresse", required = true) String tvgLegaladresse,
										@RequestParam(name = "tvgCreationdate", required = true) String tvgCreationdate,
										@RequestParam(name = "tvgCity", required = true) String tvgCity,
										@RequestParam(name = "tvgCountry", required = true) String tvgCountry,
										@RequestParam(name = "tvgRegion", required = true) String tvgRegion,
										@RequestParam(name = "tvgEmail", required = true) @Email(message="Please provide a valid email address") @Pattern(regexp=".+@.+\\..+", message="Please provide a valid email address") String tvgEmail,
										@RequestParam(name = "tvgPhone", required = true) @Pattern(regexp="^([0|\\+[0-9]{1,5})?([0-9]{10})$", message="Please provide a valid phone number") String tvgPhone,
										@RequestParam(name = "tvgDaystartA", required = true) @Pattern(regexp="^0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]$", message="Please provide a valid time") String tvgDaystartA,
										@RequestParam(name = "tvgDaystartB", required = true) @Pattern(regexp="^0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]$", message="Please provide a valid time") String tvgDaystartB,
										@RequestParam(name = "tvgDayendA", required = true) @Pattern(regexp="^0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]$", message="Please provide a valid time") String tvgDayendA,
										@RequestParam(name = "tvgDayendB", required = true) @Pattern(regexp="^0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]$", message="Please provide a valid time") String tvgDayendB,
										HttpServletResponse response) throws IOException {
		try {
        	if(login.equals(password) || login.length() < 6 || password.length() < 6 || (!signupas.toLowerCase().equals("motorist") && !signupas.toLowerCase().equals("tvg")))
        		response.sendRedirect("/?error=invalidLogin");
        	else {
        		if(!isValidDateStr(tvgCreationdate))
        			response.sendRedirect("/register?error="+error);
        		else {
        			Tvg tvgInCreation = iTVGMetier.createTVG(tvgLegalname, tvgLegaladresse, (new SimpleDateFormat("YYYY-MM-DD").parse(tvgCreationdate)), tvgCity, tvgCountry, tvgRegion, tvgEmail, tvgPhone, tvgDaystartA, tvgDaystartB, tvgDayendA, tvgDayendB, true, null, null, new Account(login, password, new Date(), false, null, null, null, null, null, null, "ROLE_TVG"));
        			model.addAttribute("TVG", tvgInCreation);
        			emailValidation(tvgInCreation.getAccount(), tvgEmail);
                	response.sendRedirect("/success?emailValidation=" + tvgEmail);
        		}
        	}
        } catch (Exception e) {
        	model.addAttribute("error", e);
        	response.sendRedirect("/register?error=" + e.getMessage());
        }
	}
	
	@RequestMapping(value = "/signupmotorist", method = RequestMethod.POST)
	public void saveMotorist(Model model,@RequestParam(name = "login", required = true) String login, 
										 @RequestParam(name = "password", required = true) String password, 
										 @RequestParam(name = "signupas", required = true) String signupas,
										 @RequestParam(name = "ipersonLastname", required = true) String ipersonLastname,
										 @RequestParam(name = "ipersonFirstname", required = true) String ipersonFirstname,
										 @RequestParam(name = "ipersonBirthday", required = true) String ipersonBirthday,
										 @RequestParam(name = "ipersonCountry", required = true) String ipersonCountry,
										 @RequestParam(name = "ipersonCity", required = true) String ipersonCity,
										 @RequestParam(name = "ipersonNationalcardid", required = true) @Size(min = 7) String ipersonNationalcardid,
										 @RequestParam(name = "ipersonEmail", required = true) @Email(message="Please provide a valid email address") @Pattern(regexp=".+@.+\\..+", message="Please provide a valid email address") String ipersonEmail,
										 @RequestParam(name = "ipersonPhone", required = true) @Pattern(regexp="^([0|\\+[0-9]{1,5})?([0-9]{10})$", message="Please provide a valid phone number") String ipersonPhone,
										 @RequestParam(name = "vehicleBrand", required = true) String vehicleBrand,
										 @RequestParam(name = "vehicleType", required = true)  String vehicleType,
										 @RequestParam(name = "vehicleFirstCirculation", required = true) String vehicleFirstCirculation,
										 @RequestParam(name = "vehicleRegistration", required = true) String vehicleRegistration,
										 HttpServletResponse response) throws IOException {
		if(login.equals(password) || login.length() < 6 || password.length() < 6 || (!signupas.toLowerCase().equals("motorist") && !signupas.toLowerCase().equals("tvg")))
    		response.sendRedirect("/?error=invalidLogin");
    	else {
    		if(!isValidDateStr(ipersonBirthday))
    			response.sendRedirect("/register?error="+error+":"+ipersonBirthday);
    		else {
    			if(!isValidDateStr(vehicleFirstCirculation))
    				response.sendRedirect("/register?error="+error+":"+vehicleFirstCirculation);
    			else {
    				try {
    					Motorist motoristInCreation = iMotoristMetier.createMotorist(ipersonLastname, ipersonFirstname, (new SimpleDateFormat("YYYY-MM-DD").parse(ipersonBirthday)), ipersonCountry, ipersonCity, ipersonNationalcardid, ipersonEmail, ipersonPhone, "MO_"+login, new Account(login, password, new Date(), false, null, null, null, null, null, null, "ROLE_MOTORIST"), vehicleBrand, vehicleType, (new SimpleDateFormat("YYYY-MM-DD").parse(vehicleFirstCirculation)), vehicleRegistration);
            			emailValidation(motoristInCreation.getAccount(), ipersonEmail);
                    	response.sendRedirect("/success?emailValidation=" + ipersonEmail);
    				} catch (ParseException e) {
    					response.sendRedirect("/register?Parseerror=" + e);
					}
    			}
    		}
    	}
	}
}
