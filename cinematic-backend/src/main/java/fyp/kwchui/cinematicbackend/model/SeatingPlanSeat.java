package fyp.kwchui.cinematicbackend.model;

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
public class SeatingPlanSeat {

    @Id
    @SequenceGenerator(name = "seating_plan_seat_seq", sequenceName = "seating_plan_seat_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seating_plan_seat_seq")
    private Long id;
    @Column(name = "seat_row")
    private String row;
    @Column(name = "seat_column")
    private String column;
    private boolean isAvailable;
    @ManyToOne
    @JoinColumn(name = "house_id")
    @JsonIgnore
    private House house;
}
