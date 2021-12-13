package fyp.kwchui.cinematicbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fyp.kwchui.cinematicbackend.model.Movie;
import fyp.kwchui.cinematicbackend.repository.MovieRepository;

@Service
public class MovieService {

    @Autowired
    MovieRepository movieRepository;

    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(Long movieId) {
        return movieRepository.findById(movieId).get();
    }

    public void addMovie(Movie movie) {
        movieRepository.save(movie);
    }

    public void deleteMovie(Long movieId) {
        if (!movieRepository.existsById(movieId)) {
            throw new IllegalStateException("Movie with id " + movieId + " does not exists.");
        }
        movieRepository.deleteById(movieId);
    }

    @Transactional
    public void updateMovie(Long movieId, Movie newMovie) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException("Movie with id " + movieId + " does not exists."));
        movie.setTitle(newMovie.getTitle());
        movie.setGenre(newMovie.getGenre());
        movie.setLanguage(newMovie.getLanguage());
        movie.setCategory(newMovie.getCategory());
        movie.setDirector(newMovie.getDirector());
        movie.setStarring(newMovie.getStarring());
        movie.setDistributor(newMovie.getDistributor());
        movie.setDescription(newMovie.getDescription());
        movie.setReleaseDate(newMovie.getReleaseDate());
        movie.setDuration(newMovie.getDuration());
        movieRepository.save(movie);
    }
}
