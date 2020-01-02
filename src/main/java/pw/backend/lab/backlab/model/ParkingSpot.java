package pw.backend.lab.backlab.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;


import javax.persistence.*;
import java.io.Serializable;


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
    @JoinColumn(name = "parkingId", nullable = false)
    private Parking parkingId;

}