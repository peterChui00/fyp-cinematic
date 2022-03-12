package fyp.kwchui.cinematicbackend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class OrderController {

    

    @PostMapping(path = "/seat/{seatId}/ticket")
    public ResponseEntity<?> purchaseTicket(
            @PathVariable("seatId") Long houseId) {
        return ResponseEntity.ok().build();
    }
}
