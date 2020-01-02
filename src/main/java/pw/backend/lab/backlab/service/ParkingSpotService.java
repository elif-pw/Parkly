package pw.backend.lab.backlab.service;

import pw.backend.lab.backlab.model.ParkingSpot;

public interface ParkingSpotService {
    ParkingSpot updateParkingSpot(Long parkingSpotId, ParkingSpot updateParkingSpot);
    boolean deleteParkingSpot(Long parkingSpotId);
}
