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

    public void addMovie(Movie movie) {
        movieRepository.findMovieByTitle(movie.getTitle())
                .orElseThrow(() -> new IllegalStateException("Title existed."));
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

        if(newMovie.getTitle()!=null && newMovie.getTitle().length()>0){
            movie.setTitle(newMovie.getTitle()); 
        }        
        if(newMovie.getGenre()!=null && newMovie.getGenre().length()>0){
            movie.setGenre(newMovie.getGenre()); 
        }   
        if(newMovie.getLanguage()!=null && newMovie.getLanguage().length()>0){
            movie.setLanguage(newMovie.getLanguage());  
        }
        if(newMovie.getCategory()!=null && newMovie.getCategory().length()>0){
            movie.setCategory(newMovie.getCategory()); 
        }
        if(newMovie.getDirector()!=null && newMovie.getDirector().length()>0){
            movie.setDirector(newMovie.getDirector()); 
        }  
        movieRepository.save(movie);
    }
}
