package fyp.kwchui.cinematicbackend.repository;

import fyp.kwchui.cinematicbackend.model.MovieShowing;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieShowingRepository extends JpaRepository<MovieShowing, Long> {

}
