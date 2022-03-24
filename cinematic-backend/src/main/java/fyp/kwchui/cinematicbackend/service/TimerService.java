package fyp.kwchui.cinematicbackend.service;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fyp.kwchui.cinematicbackend.model.Seat;
import fyp.kwchui.cinematicbackend.repository.SeatRepository;

@Component
@Transactional
public class TimerService {

    @Autowired
    SeatRepository seatRepository;

    public void releaseSeats(List<Seat> seatsOccupied) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                for (Seat seatOccupied : seatsOccupied) {
                    Seat seat = seatRepository.getById(seatOccupied.getId());
                    if (seat.getTicket() == null) {
                        seat.setOccupied(false);
                        seatRepository.save(seat);
                    }
                }
            }
        }, 900000);

    }
}
