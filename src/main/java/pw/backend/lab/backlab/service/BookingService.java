package pw.backend.lab.backlab.service;

import pw.backend.lab.backlab.model.Booking;

public interface BookingService {
    Booking updateBooking(Long id, Booking updatedBooking);
    boolean deleteBooking(Long id);
}
