package fyp.kwchui.cinematicbackend.repository;

import fyp.kwchui.cinematicbackend.model.MovieShowing;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieShowingRepository extends JpaRepository<MovieShowing, Long> {

        List<MovieShowing> findAllByShowtimeBetween(
                        LocalDateTime showtimeStart, LocalDateTime showtimeEnd);

        List<MovieShowing> findAllByShowtimeAfter(LocalDateTime showtime);

        List<MovieShowing> findAllByShowtimeBefore(LocalDateTime showtime);

}
