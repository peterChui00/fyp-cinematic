package fyp.kwchui.cinematicbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import fyp.kwchui.cinematicbackend.dto.CinemaDto;
import fyp.kwchui.cinematicbackend.dto.HouseDto;
import fyp.kwchui.cinematicbackend.dto.MovieShowingDto;
import fyp.kwchui.cinematicbackend.model.Cinema;
import fyp.kwchui.cinematicbackend.model.House;
import fyp.kwchui.cinematicbackend.model.MovieShowing;
import fyp.kwchui.cinematicbackend.service.CinemaService;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:3000/")

public class CinemaController {

    @Autowired
    CinemaService cinemaService;

    /* --- Cinema functions --- */

    @GetMapping(path = "/cinema")
    public ResponseEntity<List<Cinema>> getCinemas() {
        return ResponseEntity.ok(cinemaService.getCinemas());
    }

    @GetMapping(path = "user/{username}/cinema")
    public ResponseEntity<List<Cinema>> getCinemasByUsername(
            @PathVariable("username") String username) {
        return ResponseEntity.ok(cinemaService.getCinemasByUsername(username));
    }

    @GetMapping(path = "/cinema/{cinemaId}")
    public ResponseEntity<CinemaDto> getCinemaById(@PathVariable("cinemaId") Long cinemaId) {
        return ResponseEntity.ok(cinemaService.getCinemaById(cinemaId));
    }

    @PostMapping(path = "/cinema")
    public ResponseEntity<Cinema> addCinema(@RequestBody CinemaDto cinemaDto) {
        return new ResponseEntity<Cinema>(
                cinemaService.addCinema(cinemaDto), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/cinema/{cinemaId}")
    public ResponseEntity<?> deleteCinema(@PathVariable("cinemaId") Long cinemaId) {
        cinemaService.deleteCinema(cinemaId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/cinema/{cinemaId}")
    public ResponseEntity<Cinema> updateCinema(
            @PathVariable("cinemaId") Long cinemaId, @RequestBody CinemaDto newCinema) {
        return ResponseEntity.ok(cinemaService.updateCinema(cinemaId, newCinema));
    }

    /* --- House functions --- */

    @GetMapping(path = "/cinema/{cinemaId}/house")
    public ResponseEntity<List<House>> getHousesByCinemaId(
            @PathVariable("cinemaId") Long cinemaId) {
        return ResponseEntity.ok(cinemaService.getHousesByCinemaId(cinemaId));
    }

    @GetMapping(path = "/cinema/{cinemaId}/house/{houseId}")
    public ResponseEntity<HouseDto> getHouseById(
            @PathVariable("cinemaId") Long cinemaId, @PathVariable("houseId") Long houseId) {
        return ResponseEntity.ok(cinemaService.getHouseById(cinemaId, houseId));
    }

    @PostMapping(path = "/cinema/{cinemaId}/house")
    public ResponseEntity<House> addHouse(
            @PathVariable("cinemaId") Long cinemaId, @RequestBody House house) {
        return new ResponseEntity<House>(
                cinemaService.addHouse(cinemaId, house), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/cinema/{cinemaId}/house/{houseId}")
    public ResponseEntity<?> deleteHouse(
            @PathVariable("cinemaId") Long cinemaId, @PathVariable("houseId") Long houseId) {
        cinemaService.deleteHouse(cinemaId, houseId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/cinema/{cinemaId}/house/{houseId}")
    public ResponseEntity<House> updateHouse(
            @PathVariable("cinemaId") Long cinemaId,
            @PathVariable("houseId") Long houseId,
            @RequestBody House newHouse) {
        return ResponseEntity.ok(cinemaService.updateHouse(cinemaId, houseId, newHouse));
    }

    /* --- MovieShowing functions --- */

    @GetMapping(path = "/cinema/{cinemaId}/movieShowing/week")
    public ResponseEntity<List<MovieShowingDto>> getWeeklyMovieShowingsByCinemaId(
            @PathVariable("cinemaId") Long cinemaId) {
        return ResponseEntity.ok(cinemaService.getWeeklyMovieShowingsByCinemaId(cinemaId));
    }

    @GetMapping(path = "/cinema/{cinemaId}/house/{houseId}/movieShowing")
    public ResponseEntity<List<MovieShowingDto>> getMovieShowingsByHouseId(
            @PathVariable("houseId") Long houseId) {
        return ResponseEntity.ok(cinemaService.getMovieShowingsByHouseId(houseId));
    }

    @GetMapping(path = "/cinema/{cinemaId}/house/{houseId}/movieShowing/{movieShowingId}")
    public ResponseEntity<MovieShowingDto> getMovieShowingById(
            @PathVariable("movieShowingId") Long movieShowingId) {
        return ResponseEntity.ok(cinemaService.getMovieShowingById(movieShowingId));
    }

    @GetMapping(path = "/movieShowing/{movieShowingId}")
    public ResponseEntity<MovieShowingDto> getMovieShowing(
            @PathVariable("movieShowingId") Long movieShowingId) {
        return ResponseEntity.ok(cinemaService.getMovieShowingById(movieShowingId));
    }

    @GetMapping(path = "/movieShowing/recent")
    public ResponseEntity<List<MovieShowingDto>> getRecentMovieShowings() {
        return ResponseEntity.ok(cinemaService.getRecentMovieShowings());
    }

    @PostMapping(path = "/cinema/{cinemaId}/house/{houseId}/movieShowing")
    public ResponseEntity<MovieShowing> addMovieShowing(
            @PathVariable("houseId") Long houseId,
            @RequestBody MovieShowingDto movieShowingDto) {
        return new ResponseEntity<MovieShowing>(
                cinemaService.addMovieShowing(houseId, movieShowingDto), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/cinema/{cinemaId}/house/{houseId}/movieShowing/{movieShowingId}")
    public ResponseEntity<?> deleteMovieShowing(
            @PathVariable("movieShowingId") Long movieShowingId) {
        cinemaService.deleteMovieShowing(movieShowingId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/cinema/{cinemaId}/house/{houseId}/movieShowing/{movieShowingId}")
    public ResponseEntity<MovieShowing> updateMovieShowing(
            @PathVariable("movieShowingId") Long movieShowingId,
            @RequestBody MovieShowingDto movieShowingDto) {
        return ResponseEntity.ok(
                cinemaService.updateMovieShowing(movieShowingId, movieShowingDto));
    }

}
