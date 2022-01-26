package fyp.kwchui.cinematicbackend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fyp.kwchui.cinematicbackend.model.Cinema;
import fyp.kwchui.cinematicbackend.model.House;
import fyp.kwchui.cinematicbackend.model.Seat;
import fyp.kwchui.cinematicbackend.repository.CinemaRepository;
import fyp.kwchui.cinematicbackend.repository.HouseRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class CinemaService {

    @Autowired
    CinemaRepository cinemaRepository;

    @Autowired
    HouseRepository houseRepository;

    /* --- Cinema functions --- */

    public List<Cinema> getCinemas() {
        return cinemaRepository.findAll();
    }

    public Cinema getCinemaById(Long cinemaId) {
        return cinemaRepository.findById(cinemaId).get();
    }

    public Cinema addCinema(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    public void deleteCinema(Long cinemaId) {
        if (!cinemaRepository.existsById(cinemaId)) {
            throw new IllegalStateException("Cinema with id " + cinemaId + " does not exists.");
        }
        cinemaRepository.deleteById(cinemaId);
    }

    public Cinema updateCinema(Long cinemaId, Cinema newCinema) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new IllegalStateException("Cinema with id " + cinemaId + " does not exists."));
        cinema.setName(newCinema.getName());
        cinema.setAddress(newCinema.getAddress());
        cinema.setPhoneNumber(newCinema.getPhoneNumber());
        cinema.setLongitude(newCinema.getLongitude());
        cinema.setLatitude(newCinema.getLatitude());
        return cinemaRepository.save(cinema);
    }

    /* --- House functions --- */

    public List<House> getHousesByCinemaId(Long cinemaId) {
        return cinemaRepository.findById(cinemaId).get().getHouses();
    }

    public House getHouseById(Long houseId) {
        return houseRepository.findById(houseId).get();
    }

    public House addHouse(Long cinemaId, House house) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new IllegalStateException("Cinema with id " + cinemaId + " does not exists."));
        house.setCinema(cinema);
        return houseRepository.save(house);
    }

    public void deleteHouse(Long cinemaId, Long houseId) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new IllegalStateException("Cinema with id " + cinemaId + " does not exists."));
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new IllegalStateException("House with id " + houseId + " does not exists."));
        if (!house.getCinema().getId().equals(cinema.getId())) {
            throw new IllegalStateException();
        } else {
            houseRepository.delete(house);
        }
    }

    public void updateHouse(Long cinemaId, Long houseId, House newHouse) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new IllegalStateException("Cinema with id " + cinemaId + " does not exists."));
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new IllegalStateException("House with ID " + houseId + " does not exists."));
        if (!house.getCinema().getId().equals(cinema.getId())) {
            throw new IllegalStateException();
        } else {
            house.setName(newHouse.getName());
            houseRepository.save(house);
        }
    }

    public  List<List<Seat>> getSeatingPlan() {
        List<List<Seat>> seatingPlan = new ArrayList<List<Seat>>();
        Seat seat1 = new Seat(null, "A1", false, true);
        Seat seat2 = new Seat(null, "A2", false, true);
        Seat seat3 = new Seat(null, "A3", false, false);
        Seat seat4 = new Seat(null, "B1", false, false);
        Seat seat5 = new Seat(null, "B2", false, true);
        Seat seat6 = new Seat(null, "B3", true, true);
        List<Seat> row1 = new ArrayList<Seat>();
        row1.add(seat1);
        row1.add(seat2);
        row1.add(seat3);
        seatingPlan.add(row1);
        List<Seat> row2 = new ArrayList<Seat>();
        row2.add(seat4);
        row2.add(seat5);
        row2.add(seat6);
        seatingPlan.add(row2);
 
        return seatingPlan;
    }
}
