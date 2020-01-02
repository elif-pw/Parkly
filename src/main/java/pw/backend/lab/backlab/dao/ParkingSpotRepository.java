package pw.backend.lab.backlab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.backend.lab.backlab.model.ParkingSpot;

public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {
}
