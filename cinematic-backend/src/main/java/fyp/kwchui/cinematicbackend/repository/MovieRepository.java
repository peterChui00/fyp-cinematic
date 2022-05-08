package fyp.kwchui.cinematicbackend.repository;

import fyp.kwchui.cinematicbackend.model.Movie;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    String searchQuery = "SELECT * from cinematic.Movie m WHERE m.title LIKE %?1% OR " +
            "m.genre LIKE %?1% OR " +
            "m.language LIKE %?1% OR " +
            "m.category LIKE %?1% OR " +
            "m.description LIKE %?1% OR " +
            "m.director LIKE %?1% OR " +
            "m.starring LIKE %?1% OR " +
            "m.distributor LIKE %?1% ORDER BY m.release_date DESC";

    Optional<Movie> findByTitle(String title);

    @Query(value = searchQuery, nativeQuery = true)
    List<Movie> searchMoive(String query);
}
