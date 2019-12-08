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
@Table(name = "ParkingSpot")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ParkingSpot implements Serializable {

    private static final long serialVersionUID = -6783504532088859179L;

    public static ParkingSpot EMPTY = new ParkingSpot();

    @Id
    @Column(name="parkingSpotId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    @JoinColumn(name = "parkingId")
    private Parking parkingId;

}