package fyp.kwchui.cinematicbackend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fyp.kwchui.cinematicbackend.dto.CinemaDto;
import fyp.kwchui.cinematicbackend.dto.HouseDto;
import fyp.kwchui.cinematicbackend.dto.MovieShowingDto;
import fyp.kwchui.cinematicbackend.model.Cinema;
import fyp.kwchui.cinematicbackend.model.House;
import fyp.kwchui.cinematicbackend.model.Movie;
import fyp.kwchui.cinematicbackend.model.MovieShowing;
import fyp.kwchui.cinematicbackend.model.Seat;
import fyp.kwchui.cinematicbackend.model.SeatingPlanSeat;
import fyp.kwchui.cinematicbackend.model.User;
import fyp.kwchui.cinematicbackend.repository.CinemaRepository;
import fyp.kwchui.cinematicbackend.repository.HouseRepository;
import fyp.kwchui.cinematicbackend.repository.MovieRepository;
import fyp.kwchui.cinematicbackend.repository.MovieShowingRepository;
import fyp.kwchui.cinematicbackend.repository.SeatingPlanSeatRepository;
import fyp.kwchui.cinematicbackend.repository.UserRepository;
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

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    /* --- Cinema functions --- */

    public List<Cinema> getCinemas() {
        List<Cinema> cinemas = cinemaRepository.findAll();
        for (Cinema cinema : cinemas) {
            cinema.setUsername(cinema.getUser().getUsername());
        }
        return cinemas;
    }

    public List<Cinema> getCinemasByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User does not exists."));
        List<Cinema> cinemas = user.getCinemas();
        for (Cinema cinema : cinemas) {
            cinema.setUsername(username);
        }
        return cinemas;
    }

    public CinemaDto getCinemaById(Long cinemaId) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new IllegalStateException("Cinema with id " + cinemaId + " does not exists."));
        CinemaDto cinemaDto = modelMapper.map(cinema, CinemaDto.class);
        cinemaDto.setUsername(cinema.getUser().getUsername());
        return cinemaDto;
    }

    public Cinema addCinema(CinemaDto cinemaDto) {
        Cinema cinema = modelMapper.map(cinemaDto, Cinema.class);
        String username = cinemaDto.getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User does not exists."));
        cinema.setUser(user);
        return cinemaRepository.save(cinema);
    }

    public void deleteCinema(Long cinemaId) {
        if (!cinemaRepository.existsById(cinemaId)) {
            throw new IllegalStateException("Cinema with id " + cinemaId + " does not exists.");
        }
        cinemaRepository.deleteById(cinemaId);
    }

    public Cinema updateCinema(Long cinemaId, CinemaDto newCinema) {
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

            HouseDto houseDto = new HouseDto();
            houseDto.setName(house.getName());
            houseDto.setNumOfCol(house.getNumOfCol());
            houseDto.setNumOfRow(numOfRow);
            houseDto.setRowStyle(house.getRowStyle());
            houseDto.setSeatingPlanSeats(nestedSeatingPlanSeats);
            houseDto.setUnavailableSeatingPlanSeats(unavailableSeatingPlanSeats);
            return houseDto;
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
            house.setRowStyle(newHouse.getRowStyle());
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

    public List<MovieShowingDto> getMovieShowingsByHouseId(Long houseId) {
        List<MovieShowing> movieShowings = houseRepository.findById(houseId).get().getMovieShowings();
        List<MovieShowingDto> movieShowingDtos = new ArrayList<MovieShowingDto>();
        for (MovieShowing movieShowing : movieShowings) {
            MovieShowingDto movieShowingDto = new MovieShowingDto();
            movieShowingDto.setId(movieShowing.getId());
            movieShowingDto.setShowtime(movieShowing.getShowtime());
            movieShowingDto.setHouseId(movieShowing.getHouse().getId());
            movieShowingDto.setMovieId(movieShowing.getMovie().getId());
            movieShowingDto.setMovieTitle(movieShowing.getMovie().getTitle());
            movieShowingDtos.add(movieShowingDto);
        }
        return movieShowingDtos;
    }

    public MovieShowingDto getMovieShowingById(Long movieShowingId) {
        MovieShowing movieShowing = movieShowingRepository.findById(movieShowingId)
                .orElseThrow(() -> new IllegalStateException(
                        "MovieShowing with id " + movieShowingId + " does not exists."));
        /*
         * Convert the list of seat into a suitable nested list for front-end usage
         */
        List<Seat> seats = movieShowing.getSeats();
        int numOfRow = movieShowing.getHouse().getNumOfRow();
        List<List<Seat>> nestedSeats = new ArrayList<List<Seat>>(numOfRow);

        for (int i = 0; i < numOfRow; i++) {
            nestedSeats.add(new ArrayList<Seat>());
        }

        int curRow = -1;
        for (int i = 0; i < seats.size(); i++) {
            int row = seats.get(i).getRow();
            if (curRow != row) {
                curRow = row;
            }
            nestedSeats.get(curRow).add(seats.get(i));
        }
        MovieShowingDto movieShowingDto = new MovieShowingDto();
        movieShowingDto.setId(movieShowing.getId());
        movieShowingDto.setShowtime(movieShowing.getShowtime());
        movieShowingDto.setCinemaId(movieShowing.getHouse().getCinema().getId());
        movieShowingDto.setHouseId(movieShowing.getHouse().getId());
        movieShowingDto.setMovieId(movieShowing.getMovie().getId());
        movieShowingDto.setMovieTitle(movieShowing.getMovie().getTitle());
        movieShowingDto.setSeats(nestedSeats);
        return movieShowingDto;

    }

    public List<MovieShowingDto> getRecentMovieShowings() {
        List<MovieShowingDto> movieShowingDtos = new ArrayList<MovieShowingDto>();
        LocalDateTime showtimeStart = LocalDateTime.now().plusMinutes(10);
        LocalDateTime showtimeEnd = LocalDateTime.now().plusHours(1).plusMinutes(10);
        List<MovieShowing> movieShowings = movieShowingRepository.findAllByShowtimeBetween(
                showtimeStart, showtimeEnd);
        for (MovieShowing movieShowing : movieShowings) {
            MovieShowingDto movieShowingDto = new MovieShowingDto();
            movieShowingDto.setShowtime(movieShowing.getShowtime());
            movieShowingDto.setMovieId(movieShowing.getMovie().getId());
            movieShowingDto.setMovieTitle(movieShowing.getMovie().getTitle());
            movieShowingDto.setHouseId(movieShowing.getHouse().getId());
            movieShowingDto.setCinemaId(movieShowing.getHouse().getCinema().getId());
            movieShowingDto.setOccupancyRate(movieShowing.getoccupancyRate());
            movieShowingDtos.add(movieShowingDto);
        }
        return movieShowingDtos;
    }

    public MovieShowing addMovieShowing(
            Long houseId, MovieShowingDto movieShowingDto) {
        MovieShowing movieShowing = new MovieShowing();
        movieShowing.setShowtime(movieShowingDto.getShowtime());

        Long movieId = movieShowingDto.getMovieId();
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException("Movie with id " + movieId + " does not exists."));
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new IllegalStateException("House with ID " + houseId + " does not exists."));
        movieShowing.setMovie(movie);
        movieShowing.setHouse(house);

        List<SeatingPlanSeat> seatingPlanSeats = house.getSeatingPlanSeats();
        List<Seat> seats = new ArrayList<Seat>();
        for (SeatingPlanSeat seatingPlanSeat : seatingPlanSeats) {
            Seat seat = new Seat(
                    null,
                    seatingPlanSeat.getRow(),
                    seatingPlanSeat.getColumn(),
                    false,
                    seatingPlanSeat.isAvailable(),
                    movieShowing,
                    null);
            seats.add(seat);
        }
        movieShowing.setSeats(seats);
        log.info("Adding MovieShowing");
        return movieShowingRepository.save(movieShowing);
    }

    public MovieShowing updateMovieShowing(
            Long movieShowingId, MovieShowingDto movieShowingDto) {
        MovieShowing movieShowing = movieShowingRepository.findById(movieShowingId)
                .orElseThrow(() -> new IllegalStateException(
                        "MovieShowing with id " + movieShowingId + " does not exists."));
        Long movieId = movieShowingDto.getMovieId();
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException(
                        "Movie with id " + movieId + " does not exists."));
        movieShowing.setShowtime(movieShowingDto.getShowtime());
        movieShowing.setMovie(movie);
        log.info("Updating MovieShowing");
        return movieShowingRepository.save(movieShowing);
    }

    public void deleteMovieShowing(Long movieShowingId) {
        MovieShowing movieShowing = movieShowingRepository.findById(movieShowingId)
                .orElseThrow(() -> new IllegalStateException(
                        "MovieShowing with id " + movieShowingId + " does not exists."));
        movieShowingRepository.delete(movieShowing);
    }
}
