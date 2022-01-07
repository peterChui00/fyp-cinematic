package fyp.kwchui.cinematicbackend.model;

import java.time.LocalDateTime;

import javax.persistence.*;

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
    private House house;
    @OneToOne
    private Movie movie;
}
