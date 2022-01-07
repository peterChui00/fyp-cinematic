package fyp.kwchui.cinematicbackend.model;

import java.util.UUID;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class Ticket {
       
    @Id
    private UUID id;
    private String type;
    private float price;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
