package org.dev.security;

import org.dev.dao.AccountRepository;
import org.dev.entities.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {
    @Autowired
    private AccountRepository userService;

    @Override
    public boolean supports(Class<?> aClass) {
        return Account.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Account user = (Account) o;

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "NotEmpty");
        if (user.getAccountLogin().length() < 6 || user.getAccountLogin().length() > 32) {
            errors.rejectValue("username", "Size.userForm.username");
        }
        if (userService.findByAccountLogin(user.getAccountLogin()) != null) {
            errors.rejectValue("username", "Duplicate.userForm.username");
        }

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "NotEmpty");
        if (user.getAccountPassword().length() < 8 || user.getAccountPassword().length() > 32) {
            errors.rejectValue("password", "Size.userForm.password");
        }
    }
}