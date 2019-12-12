package pw.react.backend.reactbackend.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import pw.react.backend.reactbackend.utils.JsonDateDeserializer;
import pw.react.backend.reactbackend.utils.JsonDateSerializer;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "Booking")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Booking implements Serializable {

    private static final long serialVersionUID = -6783504532088859179L;

    public static Booking EMPTY = new Booking();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    @JoinColumn(name = "parkingId", nullable = false)
    private Parking parkingId;
    @ManyToOne
    @JoinColumn(name = "parkingSpotId", nullable = false)
    private ParkingSpot parkingSpotId;
    @Column(name = "userId", nullable = false)
    private int userId;

    @Column(name = "startDate", nullable = false)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    private LocalDateTime startDateTime;
    @Column(name = "endDate", nullable = false)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    private LocalDateTime endDate;

}