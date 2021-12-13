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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import fyp.kwchui.cinematicbackend.model.Movie;
import fyp.kwchui.cinematicbackend.service.MovieService;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    @Autowired
    MovieService movieService;
    /*
     * private final MovieService movieService;
     * 
     * @Autowired public MovieController(MovieService movieService){
     * this.movieService = movieService; }
     */

    @GetMapping(path = "/movie")
    public List<Movie> getMovies() {
        return movieService.getMovies();
    }

    @GetMapping(path = "/movie/{movieID}")
    public ResponseEntity<Movie> getMovieById(@PathVariable("movieID") Long movieId) {
        return ResponseEntity.ok(movieService.getMovieById(movieId));
    }

    @PostMapping(path = "/movie")
    public void addMovie(@RequestBody Movie movie) {
        movieService.addMovie(movie);
    }

    @DeleteMapping(path = "/movie/{movieID}")
    public void deleteMovie(@PathVariable("movieID") Long movieId) {
        movieService.deleteMovie(movieId);
    }

    @PutMapping(path = "/movie/{movieID}")
    public void updateMovie(
            @PathVariable("movieID") Long movieId,
            @RequestBody Movie newMovie) {
        movieService.updateMovie(movieId, newMovie);
    }
}
