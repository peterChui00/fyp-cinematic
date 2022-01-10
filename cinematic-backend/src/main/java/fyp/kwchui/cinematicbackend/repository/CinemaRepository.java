package fyp.kwchui.cinematicbackend.repository;

import fyp.kwchui.cinematicbackend.model.Cinema;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CinemaRepository extends JpaRepository<Cinema, Long> {
    
}
