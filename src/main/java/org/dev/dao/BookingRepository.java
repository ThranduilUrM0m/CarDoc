package org.dev.dao;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.dev.entities.Account;
import org.dev.entities.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	public Collection<Booking> findByBookingId(Long bookingId);
	@Query("select b from Booking b, Account a \r\n" + 
			"where b.account.accountId = a.accountId\r\n" + 
    		"and a = :x")
    public Collection<Booking> findByAccount(@Param("x") Account accountId);
	@Query("select b from Booking b \r\n" +
			"where b.bookingDate = :y")
	public Booking findByBookingDate(@Param("y") java.util.Date bookingDate);
}