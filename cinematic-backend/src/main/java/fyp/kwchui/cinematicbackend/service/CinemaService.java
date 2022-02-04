package fyp.kwchui.cinematicbackend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fyp.kwchui.cinematicbackend.dto.HouseDto;
import fyp.kwchui.cinematicbackend.dto.MovieShowingDto;
import fyp.kwchui.cinematicbackend.model.Cinema;
import fyp.kwchui.cinematicbackend.model.House;
import fyp.kwchui.cinematicbackend.model.MovieShowing;
import fyp.kwchui.cinematicbackend.model.SeatingPlanSeat;
import fyp.kwchui.cinematicbackend.repository.CinemaRepository;
import fyp.kwchui.cinematicbackend.repository.HouseRepository;
import fyp.kwchui.cinematicbackend.repository.MovieShowingRepository;
import fyp.kwchui.cinematicbackend.repository.SeatingPlanSeatRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class CinemaService {

    @Autowired
    CinemaRepository cinemaRepository;

    @Autowired
    HouseRepository houseRepository;

    @Autowired
    SeatingPlanSeatRepository seatingPlanSeatRepository;

    @Autowired
    MovieShowingRepository movieShowingRepository;

    /* --- Cinema functions --- */

    public List<Cinema> getCinemas() {
        return cinemaRepository.findAll();
    }

    public Cinema getCinemaById(Long cinemaId) {
        cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new IllegalStateException("Cinema with id " + cinemaId + " does not exists."));
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

    public HouseDto getHouseById(Long cinemaId, Long houseId) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new IllegalStateException("Cinema with id " + cinemaId + " does not exists."));
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new IllegalStateException("House with ID " + houseId + " does not exists."));
        if (!house.getCinema().getId().equals(cinema.getId())) {
            throw new IllegalStateException();
        } else {
            /*
             * Convert the list of seatingPlanSeat into a suitable nested list and
             * create a list of unavailable seats for front-end usage
             */
            int numOfRow = house.getNumOfRow();
            List<SeatingPlanSeat> seatingPlanSeats = house.getSeatingPlanSeats();
            List<List<SeatingPlanSeat>> nestedSeatingPlanSeats = new ArrayList<List<SeatingPlanSeat>>(numOfRow);
            List<SeatingPlanSeat> unavailableSeatingPlanSeats = new ArrayList<SeatingPlanSeat>();

            for (int i = 0; i < numOfRow; i++) {
                nestedSeatingPlanSeats.add(new ArrayList<SeatingPlanSeat>());
            }

            int curRow = -1;
            for (int i = 0; i < seatingPlanSeats.size(); i++) {
                int row = seatingPlanSeats.get(i).getRow();
                if (curRow != row) {
                    curRow = row;
                }
                nestedSeatingPlanSeats.get(curRow).add(seatingPlanSeats.get(i));
                if (!seatingPlanSeats.get(i).isAvailable()) {
                    unavailableSeatingPlanSeats.add(seatingPlanSeats.get(i));
                }
            }

            return new HouseDto(house.getName(),
                    house.getRowStyle(),
                    numOfRow,
                    house.getNumOfCol(),
                    nestedSeatingPlanSeats,
                    unavailableSeatingPlanSeats);
        }
    }

    public House addHouse(Long cinemaId, House house) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new IllegalStateException("Cinema with id " + cinemaId + " does not exists."));
        house.setCinema(cinema);
        List<SeatingPlanSeat> seatingPlanSeats = house.getSeatingPlanSeats();
        for (SeatingPlanSeat seatingPlanSeat : seatingPlanSeats) {
            seatingPlanSeat.setHouse(house);
        }
        house.setSeatingPlanSeats(seatingPlanSeats);
        log.info("Adding House [{}] with {} seats", house.getName(), house.getSeatingPlanSeats().size());
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

    public House updateHouse(Long cinemaId, Long houseId, House newHouse) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new IllegalStateException("Cinema with id " + cinemaId + " does not exists."));
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new IllegalStateException("House with ID " + houseId + " does not exists."));
        if (house.getCinema().getId() != cinema.getId()) {
            throw new IllegalStateException();
        } else {

            house.setName(newHouse.getName());
            house.setNumOfRow(newHouse.getNumOfRow());
            house.setNumOfCol(newHouse.getNumOfCol());
            if (house.getSeatingPlanSeats() != null) {
                List<SeatingPlanSeat> seatingPlanSeats = house.getSeatingPlanSeats();
                seatingPlanSeatRepository.deleteAllInBatch(seatingPlanSeats);
                seatingPlanSeats = newHouse.getSeatingPlanSeats();
                for (SeatingPlanSeat seatingPlanSeat : seatingPlanSeats) {
                    seatingPlanSeat.setHouse(house);
                }
                house.setSeatingPlanSeats(seatingPlanSeats);
            }
            return houseRepository.save(house);
        }
    }

    /* --- MovieShowing functions --- */

    public List<MovieShowing> getMovieShowingsByHouseId(Long houseId) {
        return houseRepository.findById(houseId).get().getMovieShowings();
    }

    public MovieShowingDto getMovieShowingById(Long movieShowingId) {
        MovieShowing movieShowing = movieShowingRepository.findById(movieShowingId)
                .orElseThrow(() -> new IllegalStateException(
                        "MovieShowing with id " + movieShowingId + " does not exists."));
        return null;
    }

    public MovieShowingDto addMovieShowing(Long houseId,  MovieShowing movieShowing) {
        return null;
    }

    public MovieShowingDto updateMovieShowing(Long houseId, Long movie, MovieShowing movieShowing) {
        return null;
    }

    public void deleteMovieShowing(Long cinemaId, Long houseId, Long movieShowingId) {

    }
}
