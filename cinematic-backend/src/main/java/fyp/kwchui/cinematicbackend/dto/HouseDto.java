package fyp.kwchui.cinematicbackend.dto;

import java.util.List;

import fyp.kwchui.cinematicbackend.model.SeatingPlanSeat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HouseDto {
    private String name;
    private String rowStyle;
    private int numOfRow;
    private int numOfCol;
    private List<List<SeatingPlanSeat>> seatingPlanSeats;
    private List<SeatingPlanSeat> unavailableSeatingPlanSeats;
}
