package fyp.kwchui.cinematicbackend.repository;

import fyp.kwchui.cinematicbackend.model.Movie;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    @Query("SELECT * FROM Moive m WHERE m.title = ?1")
    Optional<Movie> findMovieByTitle(String title);
}
