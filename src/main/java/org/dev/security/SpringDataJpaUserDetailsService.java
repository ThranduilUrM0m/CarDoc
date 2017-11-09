package org.dev.security;

import org.dev.dao.AccountRepository;
import org.dev.entities.Account;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private static final Logger log = LoggerFactory.getLogger(SpringDataJpaUserDetailsService.class);

	private AccountRepository repository;

	@Autowired
	public SpringDataJpaUserDetailsService(AccountRepository repository) {
		this.repository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
		log.info("Fetching user " + s);
		Account user = repository.findByAccountLogin(s);
		log.info("Transforming " + user + " into UserDetails object");
		UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getAccountLogin(), user.getAccountPassword(),
				AuthorityUtils.createAuthorityList(user.getRoles()));
		log.info("About to return " + userDetails);
		return userDetails;
	}
}