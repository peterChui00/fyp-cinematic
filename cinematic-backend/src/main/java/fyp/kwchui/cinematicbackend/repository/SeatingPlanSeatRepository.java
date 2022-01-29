package fyp.kwchui.cinematicbackend.repository;

import fyp.kwchui.cinematicbackend.model.SeatingPlanSeat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatingPlanSeatRepository extends JpaRepository<SeatingPlanSeat, Long> {

}
