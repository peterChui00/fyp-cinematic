package fyp.kwchui.cinematicbackend.controller;

import java.io.IOException;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import fyp.kwchui.cinematicbackend.dto.MovieListDto;
import fyp.kwchui.cinematicbackend.model.Movie;
import fyp.kwchui.cinematicbackend.service.MovieService;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class MovieController {

    @Autowired
    MovieService movieService;

    // *** Basic CRUD operations ***

    @GetMapping(path = "/movie")
    public List<Movie> getMovies() {
        return movieService.getMovies();
    }

    @GetMapping(path = "/movie/{movieId}")
    public ResponseEntity<Movie> getMovieById(@PathVariable("movieId") Long movieId) {
        return ResponseEntity.ok(movieService.getMovieById(movieId));
    }

    @PostMapping(path = "/movie")
    public void addMovie(@RequestBody Movie movie) {
        movieService.addMovie(movie);
    }

    @DeleteMapping(path = "/movie/{movieId}")
    public void deleteMovie(@PathVariable("movieId") Long movieId) {
        movieService.deleteMovie(movieId);
    }

    @PutMapping(path = "/movie/{movieId}")
    public void updateMovie(@PathVariable("movieId") Long movieId, @RequestBody Movie newMovie) {
        movieService.updateMovie(movieId, newMovie);
    }

    @PostMapping(path = "/movie/{movieTitle}/uploadPoster")
    public void uploadPoster(
            @PathVariable("movieTitle") String movieTitle,
            @RequestParam("posterFile") MultipartFile posterFile) {
        try {
            movieService.uploadPoster(movieTitle, posterFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @GetMapping(path = "/movie/showing")
    public ResponseEntity<List<MovieListDto>> getShowingMovies() {
        return ResponseEntity.ok(movieService.getMoviesForMovieList("showing"));
    }

    @GetMapping(path = "/movie/upcoming")
    public ResponseEntity<List<MovieListDto>> getUpcomingMovies() {
        return ResponseEntity.ok(movieService.getMoviesForMovieList("upcoming"));
    }

    @GetMapping(path = "/movie/other")
    public ResponseEntity<List<MovieListDto>> getOtherMovies() {
        return ResponseEntity.ok(movieService.getMoviesForMovieList("other"));
    }

}
