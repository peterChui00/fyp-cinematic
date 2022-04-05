package fyp.kwchui.cinematicbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fyp.kwchui.cinematicbackend.model.MovieReview;

@Repository
public interface MovieReviewRepository extends JpaRepository<MovieReview, Long> {

}
