package fyp.kwchui.cinematicbackend.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDto {
    private UUID id;
    private String type;
    private float price;
    @JsonProperty("seat")
    private SeatDto seatDto;
}
