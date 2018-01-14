package org.dev.dao;

import org.dev.entities.Motorist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MotoristRepository extends JpaRepository<Motorist, Long> {
	@Query("select m from Motorist m, Account a \r\n" + 
    		"where m.account.accountId = a.accountId\r\n" + 
    		"and a.accountLogin = :x")
    public Motorist findByAccountLogin(@Param("x") String accountLogin);
	
	public Motorist findByIpersonEmail(String ipersonEmail);
}