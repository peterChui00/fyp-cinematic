package fyp.kwchui.cinematicbackend.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class Movie {

    @Id
    @SequenceGenerator(name = "movie_sequence", sequenceName = "movie_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "movie_sequence")
    private Long id;
    private String title;
    private String genre;
    private String language;
    private String category;
    private String director;
    private String starring;
    private String distributor;
    private String description;
    private String posterUri;
    private String streamingUri;
    private LocalDate release_date;
    private float duration;
    private float rating;
    @OneToMany(mappedBy = "movie")
    private List<MovieReview> movieReviews;
    
}
