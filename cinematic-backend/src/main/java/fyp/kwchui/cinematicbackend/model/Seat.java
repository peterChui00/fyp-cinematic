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
public class Seat {
    
    @Id
    @SequenceGenerator(name = "seat_seq", sequenceName = "seat_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seat_seq")
    private Long id;
    @Column(name = "seat_row")
    private int row;
    @Column(name = "seat_column")
    private int column;
    private boolean isOccupied;
    private boolean isAvailable;

    @ManyToOne
    @JoinColumn(name = "movie_showing_id")
    @JsonIgnore
    private MovieShowing movieShowing;

    @OneToOne(mappedBy = "seat", cascade = CascadeType.ALL)
    @JsonIgnore
    private Ticket ticket;
}
