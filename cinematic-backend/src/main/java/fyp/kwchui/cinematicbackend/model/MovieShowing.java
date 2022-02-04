package fyp.kwchui.cinematicbackend.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class MovieShowing {

    @Id
    @SequenceGenerator(name = "movie_showing_seq", sequenceName = "movie_showing_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "movie_showing_seq")
    private Long id;
    private LocalDateTime showtime;
    @ManyToOne
    @JoinColumn(name = "house_id")
    @JsonIgnore
    private House house;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    @JsonIgnore
    private Movie movie;
    @OneToMany(mappedBy = "movie_showing", cascade = { CascadeType.PERSIST,
            CascadeType.MERGE, CascadeType.REFRESH })
    private List<Seat> seats;
}
