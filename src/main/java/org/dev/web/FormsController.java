package org.dev.web;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.constraints.Pattern;

import org.dev.CarDocApplication;
import org.dev.dao.AccountRepository;
import org.dev.dao.TvgRepository;
import org.dev.entities.Account;
import org.dev.entities.Tvg;
import org.dev.metier.TVGMetier;
import org.hibernate.validator.constraints.Email;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
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
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
    public void saveAccount(Model model, 	@RequestParam(name = "login", required = true) String login, 
    										@RequestParam(name = "password", required = true) String password, 
    										@RequestParam(name = "signupas", required = true) String signupas,
    										HttpServletResponse response) throws IOException {
        try {
        	if(login.equals(password) || login.length() < 6 || password.length() < 6 || (!signupas.toLowerCase().equals("motorist") && !signupas.toLowerCase().equals("tvg")))
        		response.sendRedirect("/?error=invalidForm");
        	else {
        		httpSession.setAttribute("login", login);
            	httpSession.setAttribute("password", password);
            	httpSession.setAttribute("signupas", signupas);
            	response.sendRedirect("/register");
        	}
        } catch (Exception e) {
        	model.addAttribute("error", e);
        	response.sendRedirect("/?error=" + e.getMessage());
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

	protected String error;
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
        			Tvg tvgInCreation = iTVGMetier.createTVG(tvgLegalname, tvgLegaladresse, (new SimpleDateFormat("YYYY-MM-DD").parse(tvgCreationdate)), tvgCity, tvgCountry, tvgRegion, tvgEmail, tvgPhone, tvgDaystartA, tvgDaystartB, tvgDayendA, tvgDayendB, true, null, null, new Account(login, password, new Date(), false, null, null, null, null, null, null, null, null, "ROLE_TVG"));
        			model.addAttribute("TVG", tvgInCreation);
                	response.sendRedirect("/success?emailValidation=" + tvgEmail);
        		}
        	}
        } catch (Exception e) {
        	model.addAttribute("error", e);
        	response.sendRedirect("/register?error=" + e.getMessage());
        }
	}
}
