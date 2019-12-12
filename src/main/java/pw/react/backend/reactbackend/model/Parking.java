package pw.react.backend.reactbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Parking")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Parking implements Serializable {

    private static final long serialVersionUID = -6783504532088859179L;

    public static Parking EMPTY = new Parking();

    @Id
    @Column(name="parkingId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "price", nullable = false)
    private int price;
    @Column(name = "description")
    private String description;
    @Column(name = "nspots", nullable = false)
    private int nspots;
}
