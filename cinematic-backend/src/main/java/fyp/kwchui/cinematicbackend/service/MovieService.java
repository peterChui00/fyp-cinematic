package fyp.kwchui.cinematicbackend.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import fyp.kwchui.cinematicbackend.model.Movie;
import fyp.kwchui.cinematicbackend.repository.MovieRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
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
            throw new IllegalStateException("Movie with ID " + movieId + " does not exists.");
        }
        movieRepository.deleteById(movieId);
    }

    @Transactional
    public void updateMovie(Long movieId, Movie newMovie) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException("Movie with ID " + movieId + " does not exists."));
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

    public void uploadPoster(String movieTitle, MultipartFile file) throws IOException {
        Movie movie = movieRepository.findByTitle(movieTitle)
                .orElseThrow(() -> new IllegalStateException("Movie does not exists."));
        String fileName = movieTitle + "_" +
                UUID.randomUUID().toString() + "_" +
                file.getOriginalFilename();
        file.transferTo(new File("C:\\Users\\chuik\\Documents\\fyp-cinematic\\cinematic-frontend\\public\\assets\\"
                + fileName));
        movie.setPosterFileName(fileName);
        movieRepository.save(movie);
    }
}
