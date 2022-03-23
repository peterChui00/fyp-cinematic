package fyp.kwchui.cinematicbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketTypeDto {
    private String name;
    private float price;
    private int quantity;
}
