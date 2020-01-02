package pw.backend.lab.backlab.service;

import pw.backend.lab.backlab.model.Parking;

public interface ParkingService {
    Parking updateParking(Long parkingId, Parking updatedParking);
    boolean deleteParking(Long ParkingId);
}
