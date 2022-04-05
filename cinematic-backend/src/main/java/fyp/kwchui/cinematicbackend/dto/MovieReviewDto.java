package fyp.kwchui.cinematicbackend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieReviewDto {
    private Long id;
    private String comment;
    private float rating;
    private LocalDateTime createdTime;
    private Long userId;
    private String username;
}
