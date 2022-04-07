package fyp.kwchui.cinematicbackend.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private String paymentMethod;
    private LocalDateTime orderTime;
    private List<TicketDto> tickets;
}
