package fyp.kwchui.cinematicbackend.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class House {

    @Id
    @SequenceGenerator(name = "house_seq", sequenceName = "house_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "house_seq")
    private Long id;
    private String name;
    private String rowStyle;
    private int numOfRow;
    private int numOfCol;
    @ManyToOne
    @JoinColumn(name = "cinema_id")
    @JsonIgnore
    private Cinema cinema;
    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL)
    private List<SeatingPlanSeat> seatingPlanSeats;
    @OneToMany(mappedBy = "house", cascade = { CascadeType.PERSIST,
            CascadeType.MERGE, CascadeType.REFRESH })
    private List<MovieShowing> movieShowings;
}
