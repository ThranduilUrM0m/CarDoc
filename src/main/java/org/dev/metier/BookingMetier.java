package org.dev.metier;

import java.util.Collection;
import java.util.Date;

import org.dev.entities.Account;
import org.dev.entities.Booking;
import org.dev.entities.Consultation;
import org.dev.entities.Control;
import org.dev.entities.Tvg;
import org.dev.entities.Vehicle;

public interface BookingMetier {
	public void createBooking(Date bookingDate, Date bookingCreationdate, boolean bookingIsCanceled,
			Account account, Vehicle vehicle, Control control, Collection<Consultation> consultation, Tvg tvg);
	public Collection<Booking> getAllBooking();
}
