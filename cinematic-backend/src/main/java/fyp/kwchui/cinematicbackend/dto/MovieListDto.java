package fyp.kwchui.cinematicbackend.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieListDto {
    private Long id;
    private String title;
    private String genre;
    private String language;
    private String category;
    private String director;
    private String starring;
    private String distributor;
    private String posterFileName;
    private LocalDate releaseDate;
    private float duration;
    private float avgRating;
    private int numOfMovieReviews;
}
