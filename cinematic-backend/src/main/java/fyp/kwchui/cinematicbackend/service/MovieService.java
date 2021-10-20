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
    public void updateMovie(Long movieId, String title, String genre, String language, String category, String director) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException("Movie with id " + movieId + " does not exists."));

        if(title!=null && title.length()>0){
            movie.setTitle(title); 
        }        
        if(genre!=null && genre.length()>0){
            movie.setGenre(genre); 
        }   
        if(language!=null && language.length()>0){
            movie.setLanguage(language);  
        }
        if(category!=null && category.length()>0){
            movie.setCategory(category); 
        }
        if(director!=null && director.length()>0){
            movie.setDirector(director); 
        }  
        movieRepository.save(movie);
    }
}
