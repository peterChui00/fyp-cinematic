package fyp.kwchui.cinematicbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fyp.kwchui.cinematicbackend.model.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

}
