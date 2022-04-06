package fyp.kwchui.cinematicbackend.service;

import java.util.List;
import java.util.UUID;
import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fyp.kwchui.cinematicbackend.dto.AddOrderDto;
import fyp.kwchui.cinematicbackend.dto.TicketTypeDto;
import fyp.kwchui.cinematicbackend.model.Order;
import fyp.kwchui.cinematicbackend.model.Seat;
import fyp.kwchui.cinematicbackend.model.Ticket;
import fyp.kwchui.cinematicbackend.model.User;
import fyp.kwchui.cinematicbackend.repository.OrderRepository;
import fyp.kwchui.cinematicbackend.repository.SeatRepository;
import fyp.kwchui.cinematicbackend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    SeatRepository seatRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TimerService timerService;

    public void occupySeats(List<Seat> seatsToBeOccupied) {
        for (Seat seatToBeOccupied : seatsToBeOccupied) {
            Seat seat = seatRepository.getById(seatToBeOccupied.getId());
            seat.setOccupied(true);
            seatRepository.save(seat);
        }
        timerService.releaseSeats(seatsToBeOccupied);
    }
    /*
     * public void releaseSeats(List<Seat> seatsToBeReleased) {
     * for (Seat seatToBeReleased : seatsToBeReleased) {
     * Seat seat = seatRepository.getById(seatToBeReleased.getId());
     * seat.setOccupied(false);
     * seatRepository.save(seat);
     * }
     * }
     */

    public Order addOrder(AddOrderDto addOrderDto) {
        Order order = new Order();
        User user = userRepository.getById(addOrderDto.getUserId());
        order.setUser(user);
        order.setOrderTime(addOrderDto.getOrderTime());
        order.setPaymentMethod("credit card");

        // Generate tickets
        List<Ticket> ticketList = new ArrayList<Ticket>();
        List<TicketTypeDto> ticketTypeDtos = addOrderDto.getTicketTypes();
        for (Seat selectedSeat : addOrderDto.getSeats()) {
            Seat seat = seatRepository.findById(selectedSeat.getId()).get();
            Ticket ticket = new Ticket();
            ticket.setId(UUID.randomUUID());
            ticket.setSeat(seat);
            ticket.setOrder(order);

            TicketTypeDto ticketTypeDto = ticketTypeDtos.get(0);
            ticket.setType(ticketTypeDto.getName());
            ticket.setPrice(ticketTypeDto.getPrice());
            ticketList.add(ticket);

            // Remove ticket type that have been assigned to a ticket
            int quantity = ticketTypeDto.getQuantity();
            if (quantity > 0) {
                ticketTypeDto.setQuantity(quantity - 1);
                ticketTypeDtos.set(0, ticketTypeDto);
            }
            if (quantity - 1 == 0) {
                ticketTypeDtos.remove(0);
            }
        }
        order.setTickets(ticketList);
        log.info("New order by user {}#{}", user.getUsername(), user.getId());
        return orderRepository.save(order);
    }

    public List<Order> getOrderByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User does not exists."));
        return user.getOrders();
    };
}
