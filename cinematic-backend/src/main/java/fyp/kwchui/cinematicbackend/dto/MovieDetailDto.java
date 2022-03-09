package fyp.kwchui.cinematicbackend.dto;

import java.util.List;

import fyp.kwchui.cinematicbackend.model.MovieReview;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDetailDto {
    private MovieDto movie;
    private List<MovieReview> movieReviews;
    private List<MovieShowingDto> movieShowings;
}
