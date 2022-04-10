package fyp.kwchui.cinematicbackend.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.annotation.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Cinema {

    @Id
    @SequenceGenerator(name = "cinema_seq", sequenceName = "cinema_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cinema_seq")
    private Long id;
    private String name;
    private String phoneNumber;
    private String address;
    private Double longitude;
    private Double latitude;
    
    @OneToMany(mappedBy = "cinema", cascade = CascadeType.ALL)
    private List<House> houses;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Transient
    private String username;
}
