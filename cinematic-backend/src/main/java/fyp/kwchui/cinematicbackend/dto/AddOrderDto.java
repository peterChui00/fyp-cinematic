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
public class AddOrderDto {
    private Long userId;
    private LocalDateTime orderTime;
    private List<Seat> seats;
    private List<TicketTypeDto> ticketTypes;
}
