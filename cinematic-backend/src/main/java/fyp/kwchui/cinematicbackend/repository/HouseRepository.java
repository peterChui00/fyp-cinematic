package fyp.kwchui.cinematicbackend.repository;

import fyp.kwchui.cinematicbackend.model.House;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {

}
