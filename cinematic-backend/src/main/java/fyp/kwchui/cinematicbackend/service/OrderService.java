package fyp.kwchui.cinematicbackend.service;

import java.util.List;
import java.util.UUID;
import java.util.ArrayList;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fyp.kwchui.cinematicbackend.dto.AddOrderDto;
import fyp.kwchui.cinematicbackend.dto.MovieShowingDto;
import fyp.kwchui.cinematicbackend.dto.OrderDto;
import fyp.kwchui.cinematicbackend.dto.SeatDto;
import fyp.kwchui.cinematicbackend.dto.TicketDto;
import fyp.kwchui.cinematicbackend.dto.TicketTypeDto;
import fyp.kwchui.cinematicbackend.model.MovieShowing;
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

    @Autowired
    private ModelMapper modelMapper;

    public void occupySeats(List<Seat> seatsToBeOccupied) {
        for (Seat seatToBeOccupied : seatsToBeOccupied) {
            Seat seat = seatRepository.getById(seatToBeOccupied.getId());
            seat.setOccupied(true);
            seatRepository.save(seat);
        }
        timerService.releaseSeats(seatsToBeOccupied);
    }
   
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

    public List<OrderDto> getOrderByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User does not exists."));
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : user.getOrders()) {
            OrderDto orderDto = new OrderDto();
            List<TicketDto> ticketDtos = new ArrayList<>();
            for (Ticket ticket : order.getTickets()) {
                Seat seat = ticket.getSeat();
                MovieShowing movieShowing = seat.getMovieShowing();

                MovieShowingDto movieShowingDto = new MovieShowingDto();
                movieShowingDto.setId(movieShowing.getId());
                movieShowingDto.setShowtime(movieShowing.getShowtime());
                movieShowingDto.setMovieTitle(movieShowing.getMovie().getTitle());

                SeatDto seatDto = modelMapper.map(seat, SeatDto.class);
                seatDto.setCinemaName(movieShowing.getHouse().getCinema().getName());
                seatDto.setHouseName(movieShowing.getHouse().getName());
                seatDto.setRowStyle(movieShowing.getHouse().getRowStyle());
                seatDto.setMovieShowingDto(movieShowingDto);

                TicketDto ticketDto = modelMapper.map(ticket, TicketDto.class);
                ticketDto.setSeatDto(seatDto);
                ticketDtos.add(ticketDto);
            }

            orderDto.setId(order.getId());
            orderDto.setOrderTime(order.getOrderTime());
            orderDto.setPaymentMethod(order.getPaymentMethod());
            orderDto.setTickets(ticketDtos);
            orderDtos.add(orderDto);
        }
        return orderDtos;
    };

    public List<TicketDto> getTicketsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User does not exists."));

        List<TicketDto> ticketDtos = new ArrayList<>();
        for (Order order : user.getOrders()) {
            for (Ticket ticket : order.getTickets()) {
                Seat seat = ticket.getSeat();
                MovieShowing movieShowing = seat.getMovieShowing();

                MovieShowingDto movieShowingDto = new MovieShowingDto();
                movieShowingDto.setId(movieShowing.getId());
                movieShowingDto.setShowtime(movieShowing.getShowtime());
                movieShowingDto.setMovieTitle(movieShowing.getMovie().getTitle());

                SeatDto seatDto = modelMapper.map(seat, SeatDto.class);
                seatDto.setCinemaName(movieShowing.getHouse().getCinema().getName());
                seatDto.setHouseName(movieShowing.getHouse().getName());
                seatDto.setRowStyle(movieShowing.getHouse().getRowStyle());
                seatDto.setMovieShowingDto(movieShowingDto);

                TicketDto ticketDto = modelMapper.map(ticket, TicketDto.class);
                ticketDto.setSeatDto(seatDto);
                ticketDtos.add(ticketDto);
            }
        }
        return ticketDtos;
    };
}
