package fyp.kwchui.cinematicbackend.model;

import java.util.List;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class House {

    @Id
    @SequenceGenerator(name = "house_seq", sequenceName = "house_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "house_seq")
    private Long id;
    private String name;
}
