package pw.react.backend.reactbackend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.reactbackend.dao.BookingRepository;
import pw.react.backend.reactbackend.model.Booking;
import pw.react.backend.reactbackend.service.BookingService;
import pw.react.backend.reactbackend.service.SecurityService;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "/Booking")
public class BookingController {

    private final Logger logger = LoggerFactory.getLogger(BookingController.class);

    private BookingRepository repository;
    private SecurityService securityService;
    private BookingService BookingService;

    @Autowired
    public BookingController(BookingRepository repository, SecurityService securityService, BookingService BookingService) {
        this.repository = repository;
        this.securityService = securityService;
        this.BookingService = BookingService;
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createCompanies(@RequestHeader HttpHeaders headers, @Valid @RequestBody List<Booking> companies) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            List<Booking> result = repository.saveAll(companies);
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

    @GetMapping(path = "/{BookingId}")
    public ResponseEntity<Booking> getParking(@RequestHeader HttpHeaders headers,
                                                  @PathVariable Long BookingId) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            return ResponseEntity.ok(repository.findById(BookingId).orElseGet(() -> Booking.EMPTY));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Booking.EMPTY);
    }

    @GetMapping(path = "")
    public ResponseEntity<Collection<Booking>> getAllCompanies(@RequestHeader HttpHeaders headers) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            return ResponseEntity.ok(repository.findAll());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
    }

    @PutMapping(path = "/{BookingId}")
    public ResponseEntity<Booking> updateParking(@RequestHeader HttpHeaders headers,
                                                     @PathVariable Long BookingId,
                                                     @RequestBody Booking updatedParkingSpot) {
        logHeaders(headers);
        Booking result;
        if (securityService.isAuthorized(headers)) {
            result = BookingService.updateBooking(BookingId, updatedParkingSpot);
            if (Booking.EMPTY.equals(result)) {
                return ResponseEntity.badRequest().body(updatedParkingSpot);
            }
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Booking.EMPTY);
    }

    @DeleteMapping(path = "/{BookingId}")
    public ResponseEntity<String> updateParking(@RequestHeader HttpHeaders headers, @PathVariable Long BookingId) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            boolean deleted = BookingService.deleteBooking(BookingId);
            if (!deleted) {
                return ResponseEntity.badRequest().body(String.format("Parking with id %s does not exists.", BookingId));
            }
            return ResponseEntity.ok(String.format("Parking with id %s deleted.", BookingId));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access to resources.");
    }

}
