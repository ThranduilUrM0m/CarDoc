package org.dev.web;

import org.dev.entities.Account;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpController {

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String saveAccount(Model model, String accountLogin, String accountPassword) {
        try {
            return "reached";
        } catch (Exception e) {
        	return "fuck go back";
        }
    }
}