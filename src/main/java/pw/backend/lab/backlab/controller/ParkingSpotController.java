package pw.backend.lab.backlab.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import pw.backend.lab.backlab.dao.ParkingSpotRepository;
import pw.backend.lab.backlab.model.ParkingSpot;
import pw.backend.lab.backlab.service.ParkingSpotService;
import pw.backend.lab.backlab.service.SecurityService;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "/ParkingSpot")
public class ParkingSpotController {

    private final Logger logger = LoggerFactory.getLogger(ParkingSpotController.class);

    private ParkingSpotRepository repository;
    private SecurityService securityService;
    private pw.backend.lab.backlab.service.ParkingSpotService ParkingSpotService;

    @Autowired
    public ParkingSpotController(ParkingSpotRepository repository, SecurityService securityService, ParkingSpotService ParkingSpotService) {
        this.repository = repository;
        this.securityService = securityService;
        this.ParkingSpotService = ParkingSpotService;
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createCompanies(@RequestHeader HttpHeaders headers, @Valid @RequestBody List<ParkingSpot> parkingspots) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            List<ParkingSpot> result = repository.saveAll(parkingspots);
            return ResponseEntity.ok(result.stream().map(c -> String.valueOf(c.getId())).collect(joining(",")));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access to resources.");
    }

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    @GetMapping(path = "/{ParkingSpotId}")
    public ResponseEntity<ParkingSpot> getParking(@RequestHeader HttpHeaders headers,
                                              @PathVariable Long ParkingSpotId) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            return ResponseEntity.ok(repository.findById(ParkingSpotId).orElseGet(() -> ParkingSpot.EMPTY));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ParkingSpot.EMPTY);
    }

    @GetMapping(path = "")
    public ResponseEntity<Collection<ParkingSpot>> getAllCompanies(@RequestHeader HttpHeaders headers) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            return ResponseEntity.ok(repository.findAll());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
    }

    @PutMapping(path = "/{ParkingSpotId}")
    public ResponseEntity<ParkingSpot> updateParking(@RequestHeader HttpHeaders headers,
                                                 @PathVariable Long ParkingSpotId,
                                                 @RequestBody ParkingSpot updatedParkingSpot) {
        logHeaders(headers);
        ParkingSpot result;
        if (securityService.isAuthorized(headers)) {
            result = ParkingSpotService.updateParkingSpot(ParkingSpotId, updatedParkingSpot);
            if (ParkingSpot.EMPTY.equals(result)) {
                return ResponseEntity.badRequest().body(updatedParkingSpot);
            }
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ParkingSpot.EMPTY);
    }

    @DeleteMapping(path = "/{ParkingSpotId}")
    public ResponseEntity<String> updateParking(@RequestHeader HttpHeaders headers, @PathVariable Long parkingSpotId) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            boolean deleted = ParkingSpotService.deleteParkingSpot(parkingSpotId);
            if (!deleted) {
                return ResponseEntity.badRequest().body(String.format("Parking spot with id %s does not exists.", parkingSpotId));
            }
            return ResponseEntity.ok(String.format("Parking spot with id %s deleted.", parkingSpotId));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access to resources.");
    }

}