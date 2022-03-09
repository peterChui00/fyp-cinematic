package fyp.kwchui.cinematicbackend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import fyp.kwchui.cinematicbackend.model.Seat;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieShowingMgmtDto {
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm", timezone = "GMT+8")
    private LocalDateTime showtime;
    private Long houseId;
    private Long movieId;
    private String movieTitle;
    private List<List<Seat>> seats;
    private List<Seat> occupiedSeats;
    private List<Seat> unavailableSeats;
}
