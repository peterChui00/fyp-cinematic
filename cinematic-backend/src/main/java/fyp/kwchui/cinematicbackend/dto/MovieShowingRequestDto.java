package fyp.kwchui.cinematicbackend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieShowingRequestDto {
    private LocalDateTime showtime;
    private Long movieId;
}
