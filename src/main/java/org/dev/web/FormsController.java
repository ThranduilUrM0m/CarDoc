package org.dev.web;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FormsController {
	@Autowired 
	private HttpSession httpSession;
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
    public void saveAccount(Model model, 	@RequestParam(name = "login", required = true) String login, 
    										@RequestParam(name = "password", required = true) String password, 
    										@RequestParam(name = "signupas", required = true) String signupas,
    										HttpServletResponse response) throws IOException {
        try {
        	if(login.equals(password) || login.length() < 6 || password.length() < 6 || (!signupas.toLowerCase().equals("motorist") && !signupas.toLowerCase().equals("tvg")))
        		response.sendRedirect("/?error=invalidform");
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
}
