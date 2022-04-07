package fyp.kwchui.cinematicbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatDto {
    private Long id;
    private int row;
    private int column;
    private boolean isOccupied;
    private boolean isAvailable;
    private String cinemaName;
    private String houseName;
    private String rowStyle;
    @JsonProperty("movieShowing")
    private MovieShowingDto movieShowingDto;
}
