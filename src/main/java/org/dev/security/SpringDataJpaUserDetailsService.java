package org.dev.security;

import org.dev.dao.AccountRepository;
import org.dev.entities.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private final AccountRepository repository;

	@Autowired
	public SpringDataJpaUserDetailsService(AccountRepository repository) {
		this.repository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String accountLogin) throws UsernameNotFoundException {
		Account account = this.repository.findByAccountLogin(accountLogin);
		return new User(account.getAccountLogin(), account.getAccountPassword(),
				AuthorityUtils.createAuthorityList(account.getRoles()));
	}

}