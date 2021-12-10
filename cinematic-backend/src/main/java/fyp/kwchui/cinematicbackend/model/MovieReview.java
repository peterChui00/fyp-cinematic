package fyp.kwchui.cinematicbackend.model;

import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class MovieReview {

    @Id
    @SequenceGenerator(name = "movie_review_sequence", sequenceName = "movie_review_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "movie_review_sequence")
    private Long id;
    private String comment;
    private float rating;
    private LocalDateTime createdTime;
    @ManyToOne
    @JoinColumn(name = "movieId")
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
