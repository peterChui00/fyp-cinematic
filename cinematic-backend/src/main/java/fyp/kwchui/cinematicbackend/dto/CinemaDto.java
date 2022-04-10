package fyp.kwchui.cinematicbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CinemaDto {
    private Long id;
    private String name;
    private String phoneNumber;
    private String address;
    private Double longitude;
    private Double latitude;
    private String username;
}
