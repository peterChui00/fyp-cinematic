package fyp.kwchui.cinematicbackend.dto;

import java.time.LocalDateTime;
import java.util.List;

import fyp.kwchui.cinematicbackend.model.Seat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieShowingDto {
    private Long id;
    private LocalDateTime showtime;
    private Long movieId;
    private String movieTitle;
    private Long houseId;
    private Long cinemaId;
    private float occupancyRate;
    private List<List<Seat>> seats;
}
