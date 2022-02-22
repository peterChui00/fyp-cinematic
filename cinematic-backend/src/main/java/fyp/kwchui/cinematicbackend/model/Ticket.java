package fyp.kwchui.cinematicbackend.model;

import java.util.UUID;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @JsonIgnore
    private Order order;

    @OneToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;
}
