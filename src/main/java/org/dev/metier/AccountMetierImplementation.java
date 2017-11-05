package org.dev.metier;

import java.util.Collection;

import org.dev.dao.AccountRepository;
import org.dev.entities.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AccountMetierImplementation implements AccountMetier{
	@Autowired
	protected AccountRepository accountRep;

	
	@Override
	public Account getAccountByUsername(String username) {
		return accountRep.findByAccountLogin(username);
	}


	@Override
	public Collection<Account> getAllAccount() {
		return accountRep.findAll();
	}
	
}
