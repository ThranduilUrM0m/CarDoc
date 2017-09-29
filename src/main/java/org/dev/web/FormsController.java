package org.dev.web;

import javax.servlet.http.HttpSession;

import org.dev.entities.Account;
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
    public String saveAccount(Model model, 	@RequestParam(name = "login", required = true)  String login, 
    										@RequestParam(name = "password", required = true) String password, 
    										@RequestParam(name = "signupas", required = true) String signupas) {
        try {
        	httpSession.setAttribute("login", login);
        	httpSession.setAttribute("password", password);
        	httpSession.setAttribute("signupas", signupas);
            return httpSession.getAttribute("login").toString();
        } catch (Exception e) {
        	model.addAttribute("error", e);
            return "redirect:/?error=" + e.getMessage();
        }
    }
}
