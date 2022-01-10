package fyp.kwchui.cinematicbackend.model;

import java.util.List;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class Cinema {

    @Id
    @SequenceGenerator(name = "cinema_seq", sequenceName = "cinema_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cinema_seq")
    private Long id;
    private String name;
    private String address;
    private String phoneNumber;
    private Double longitude;
    private Double latitude;
    @OneToMany(mappedBy = "cinema", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<House> houses;
}
