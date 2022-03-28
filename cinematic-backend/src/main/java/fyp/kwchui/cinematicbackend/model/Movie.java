package fyp.kwchui.cinematicbackend.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Movie {

    @Id
    @SequenceGenerator(name = "movie_seq", sequenceName = "movie_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "movie_seq")
    private Long id;
    private String title;
    private String genre;
    private String language;
    private String category;
    private String director;
    private String starring;
    private String distributor;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String posterFileName;
    private LocalDate releaseDate;
    private float duration;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<MovieReview> movieReviews;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<MovieShowing> movieShowings;
}
