package fyp.kwchui.cinematicbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fyp.kwchui.cinematicbackend.dto.AddOrderDto;
import fyp.kwchui.cinematicbackend.model.Order;
import fyp.kwchui.cinematicbackend.model.Seat;
import fyp.kwchui.cinematicbackend.service.OrderService;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PatchMapping(path = "/occupySeat")
    public ResponseEntity<?> occupySeats(@RequestBody List<Seat> seatsToBeOccupied) {
        orderService.occupySeats(seatsToBeOccupied);
        return ResponseEntity.ok().build();
    }

   /*  @PatchMapping(path = "/releaseSeat")
    public ResponseEntity<?> releaseSeats(@RequestBody List<Seat> seatsToBeReleased) {
        orderService.releaseSeats(seatsToBeReleased);
        return ResponseEntity.ok().build();
    } */

    @PostMapping(path = "/order")
    public ResponseEntity<Order> addOrder(@RequestBody AddOrderDto addOrderDto) {
        return new ResponseEntity<Order>(orderService.addOrder(addOrderDto), HttpStatus.CREATED);
    }
}
