package org.dev.dao;

import org.dev.entities.Tvg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TvgRepository extends JpaRepository<Tvg, Long> {
    @Query("select t from Tvg t, Account a \r\n" + 
    		"where t.account.accountId = a.accountId\r\n" + 
    		"and a.accountLogin = :x")
    public Tvg findByAccountLogin(@Param("x") String accountLogin);
    public Tvg findByTvgEmail(String tvgEmail);
}