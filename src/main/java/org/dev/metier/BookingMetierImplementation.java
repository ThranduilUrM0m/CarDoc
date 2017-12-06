package org.dev.metier;

import java.util.Collection;
import java.util.Date;

import org.dev.dao.AccountRepository;
import org.dev.dao.BookingRepository;
import org.dev.dao.TvgRepository;
import org.dev.entities.Account;
import org.dev.entities.Booking;
import org.dev.entities.Consultation;
import org.dev.entities.Control;
import org.dev.entities.Tvg;
import org.dev.entities.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BookingMetierImplementation implements BookingMetier{
	@Autowired
	protected BookingRepository bookingRep;
	@Autowired
	protected TvgRepository tvgRep;
	@Autowired
	protected AccountRepository accountRep;
	
	@Override
	public Collection<Booking> getAllBooking() {
		// TODO Auto-generated method stub
		return this.bookingRep.findAll();
	}

	@Override
	public void createBooking(Date bookingDate, Date bookingCreationdate, boolean bookingIsCanceled, Account account,
			Vehicle vehicle, Control control, Collection<Consultation> consultation, Tvg tvg) {
		this.bookingRep.save(
			new Booking(
				bookingDate, 
				bookingCreationdate, 
				bookingIsCanceled, 
				account, 
				vehicle, 
				control, 
				consultation, 
				tvg
			)
		);
		this.accountRep.findOne(account.getAccountId()).setBooking(this.bookingRep.findByAccount(this.accountRep.findOne(account.getAccountId())));
	}

}
