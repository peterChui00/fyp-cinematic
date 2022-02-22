package fyp.kwchui.cinematicbackend.model;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class MovieReview {

    @Id
    @SequenceGenerator(name = "movie_review_seq", sequenceName = "movie_review_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "movie_review_seq")
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String comment;
    private float rating;
    private LocalDateTime createdTime;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    @JsonIgnore
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

}
