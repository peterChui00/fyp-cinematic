package fyp.kwchui.cinematicbackend.dto;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieShowingRequestDto {
    private Long id;
    private LocalDateTime showtime;
    private Long movieId;
}
