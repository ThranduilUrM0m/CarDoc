package org.dev.dao;

import java.util.Date;
import java.util.List;

import org.dev.entities.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	public List<Booking> findBybookingDate(Date bookingDate);
	@Query("select a from Booking a where a.bookingDate like :x")
	public Page<Booking> searchBookings(@Param("x")String mc, Pageable pageable);
}