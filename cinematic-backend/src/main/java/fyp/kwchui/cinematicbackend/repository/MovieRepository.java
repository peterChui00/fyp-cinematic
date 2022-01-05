package fyp.kwchui.cinematicbackend.repository;

import fyp.kwchui.cinematicbackend.model.Movie;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findByTitle(String title);
}
