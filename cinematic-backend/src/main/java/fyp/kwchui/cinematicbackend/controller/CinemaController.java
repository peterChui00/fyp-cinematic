package fyp.kwchui.cinematicbackend.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import fyp.kwchui.cinematicbackend.model.Cinema;
import fyp.kwchui.cinematicbackend.model.House;
import fyp.kwchui.cinematicbackend.model.Seat;
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

    @GetMapping(path = "/cinema/{cinemaId}")
    public ResponseEntity<Cinema> getCinemaById(@PathVariable("cinemaId") Long cinemaId) {
        return ResponseEntity.ok(cinemaService.getCinemaById(cinemaId));
    }

    @PostMapping(path = "/cinema")
    public ResponseEntity<Cinema> addCinema(@RequestBody Cinema cinema) {
        return new ResponseEntity<Cinema>(cinemaService.addCinema(cinema), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/cinema/{cinemaId}")
    public ResponseEntity<?> deleteCinema(@PathVariable("cinemaId") Long cinemaId) {
        cinemaService.deleteCinema(cinemaId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/cinema/{cinemaId}")
    public ResponseEntity<Cinema> updateCinema(@PathVariable("cinemaId") Long cinemaId, @RequestBody Cinema newCinema) {
        return ResponseEntity.ok(cinemaService.updateCinema(cinemaId, newCinema));
    }

    /* --- House functions --- */
    @GetMapping(path = "/cinema/{cinemaId}/house")
    public ResponseEntity<List<House>> getHousesByCinemaId(@PathVariable("cinemaId") Long cinemaId) {
        return ResponseEntity.ok(cinemaService.getHousesByCinemaId(cinemaId));
    }

    @DeleteMapping(path = "/cinema/{cinemaId}/house/{houseId}")
    public ResponseEntity<?> deleteCinema(@PathVariable("cinemaId") Long cinemaId,
            @PathVariable("houseId") Long houseId) {
        cinemaService.deleteHouse(cinemaId, houseId);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/cinema/{cinemaId}/house/seatingPlan")
    public ResponseEntity<List<List<Seat>>> getSeatingPlan() {
        return ResponseEntity.ok(cinemaService.getSeatingPlan());
    }
}
