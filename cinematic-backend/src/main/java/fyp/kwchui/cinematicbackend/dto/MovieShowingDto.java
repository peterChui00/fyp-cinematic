package fyp.kwchui.cinematicbackend.dto;

import java.time.LocalDateTime;
import java.util.List;

import fyp.kwchui.cinematicbackend.model.Seat;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieShowingDto {
    private LocalDateTime showtime;
    private Long houseId;
    private Long movieId;
    private String movieTitle;
    private List<List<Seat>> seats;
    private List<Seat> occupiedSeats;
    private List<Seat> unavailableSeats;
}
