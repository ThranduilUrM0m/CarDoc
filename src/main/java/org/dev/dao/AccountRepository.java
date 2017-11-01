package org.dev.dao;

import java.util.Collection;

import org.dev.entities.Account;
import org.dev.entities.Motorist;
import org.dev.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends JpaRepository<Account, Long> {
	public Account findByAccountLogin(String accountLogin);
}