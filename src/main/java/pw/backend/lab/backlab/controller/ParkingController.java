package pw.backend.lab.backlab.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pw.backend.lab.backlab.appException.UnauthorizedException;
import pw.backend.lab.backlab.dao.ParkingRepository;
import pw.backend.lab.backlab.model.Parking;
import pw.backend.lab.backlab.service.ParkingService;
import pw.backend.lab.backlab.service.SecurityService;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "/Parking")
public class ParkingController {

    private final Logger logger = LoggerFactory.getLogger(ParkingController.class);

    private ParkingRepository repository;
    private SecurityService securityService;
    private ParkingService ParkingService;

    @Autowired
    public ParkingController(ParkingRepository repository, SecurityService securityService, ParkingService ParkingService) {
        this.repository = repository;
        this.securityService = securityService;
        this.ParkingService = ParkingService;
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createCompanies(@RequestHeader HttpHeaders headers, @Valid @RequestBody List<Parking> parkings) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            List<Parking> result = repository.saveAll(parkings);
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

    @GetMapping(path = "/{ParkingId}")
    public ResponseEntity<Parking> getParking(@RequestHeader HttpHeaders headers,
                                              @PathVariable Long ParkingId) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            return ResponseEntity.ok(repository.findById(ParkingId).orElseGet(() -> Parking.EMPTY));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Parking.EMPTY);
    }

    @GetMapping(path = "")
    public ResponseEntity<Collection<Parking>> getAllCompanies(@RequestHeader HttpHeaders headers) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            return ResponseEntity.ok(repository.findAll());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
    }

    @PutMapping(path = "/{ParkingId}")
    public ResponseEntity<Parking> updateParking(@RequestHeader HttpHeaders headers,
                                                 @PathVariable Long ParkingId,
                                                 @RequestBody Parking updatedParking) {
        logHeaders(headers);
        Parking result;
        if (securityService.isAuthorized(headers)) {
            result = ParkingService.updateParking(ParkingId, updatedParking);
            if (Parking.EMPTY.equals(result)) {
                return ResponseEntity.badRequest().body(updatedParking);
            }
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Parking.EMPTY);
    }

    @DeleteMapping(path = "/{ParkingId}")
    public ResponseEntity<String> updateParking(@RequestHeader HttpHeaders headers, @PathVariable Long ParkingId) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            boolean deleted = ParkingService.deleteParking(ParkingId);
            if (!deleted) {
                return ResponseEntity.badRequest().body(String.format("Parking with id %s does not exists.", ParkingId));
            }
            return ResponseEntity.ok(String.format("Parking with id %s deleted.", ParkingId));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access to resources.");
    }


}
