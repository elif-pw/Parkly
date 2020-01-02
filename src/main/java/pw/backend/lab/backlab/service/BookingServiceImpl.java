package pw.backend.lab.backlab.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pw.backend.lab.backlab.dao.BookingRepository;
import pw.backend.lab.backlab.model.Booking;

@Service
public class BookingServiceImpl implements BookingService {
    private final Logger logger = LoggerFactory.getLogger(ParkingServiceImpl.class);

    private BookingRepository repository;

    BookingServiceImpl() { /*Needed only for initializing spy in unit tests*/}

    @Autowired
    BookingServiceImpl(BookingRepository repository) {
        this.repository = repository;
    }

    @Override
    public Booking updateBooking(Long id, Booking updatedParkingSpot) {
        Booking result = Booking.EMPTY;
        if (repository.existsById(id)) {
            updatedParkingSpot.setId(id);
            result = repository.save(updatedParkingSpot);
            logger.info("Booking with id {} updated.", id);
        }
        return result;
    }

    @Override
    public boolean deleteBooking(Long ParkingSpotId) {
        boolean result = false;
        if (repository.existsById(ParkingSpotId)) {
            repository.deleteById(ParkingSpotId);
            logger.info("Booking with id {} deleted.", ParkingSpotId);
            result = true;
        }
        return result;
    }

}