package org.dev.dao;

import java.util.List;

import org.dev.entities.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends JpaRepository<Account, Long> {
	public List<Account> findByaccountLogin(String accountLogin);
	@Query("select a from Account a where a.accountLogin like :x")
	public Page<Account> searchAccounts(@Param("x")String mc, Pageable pageable);
}