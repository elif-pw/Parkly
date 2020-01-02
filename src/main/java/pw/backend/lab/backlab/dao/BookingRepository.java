package pw.backend.lab.backlab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.backend.lab.backlab.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}