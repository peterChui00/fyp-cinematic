package fyp.kwchui.cinematicbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fyp.kwchui.cinematicbackend.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
