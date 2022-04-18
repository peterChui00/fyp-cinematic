package fyp.kwchui.cinematicbackend.repository;


import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fyp.kwchui.cinematicbackend.model.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {

}
