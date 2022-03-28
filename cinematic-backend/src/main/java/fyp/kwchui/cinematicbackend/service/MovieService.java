package fyp.kwchui.cinematicbackend.service;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import fyp.kwchui.cinematicbackend.dto.MovieDetailDto;
import fyp.kwchui.cinematicbackend.dto.MovieDto;
import fyp.kwchui.cinematicbackend.dto.MovieListDto;
import fyp.kwchui.cinematicbackend.dto.MovieShowingDto;
import fyp.kwchui.cinematicbackend.model.Movie;
import fyp.kwchui.cinematicbackend.model.MovieReview;
import fyp.kwchui.cinematicbackend.model.MovieShowing;
import fyp.kwchui.cinematicbackend.repository.MovieRepository;
import fyp.kwchui.cinematicbackend.repository.MovieShowingRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MovieService {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    MovieShowingRepository movieShowingRepository;

    @Autowired
    private ModelMapper modelMapper;

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
        log.info("Uploading poster [{}]", fileName);
    }

    public List<MovieListDto> getMoviesForMovieList(String type) {
        List<MovieListDto> movieList = new ArrayList<MovieListDto>();
        List<MovieShowing> movieShowings = new ArrayList<MovieShowing>();
        LocalDateTime showtime = LocalDateTime.now();

        // Get all the movie showings based on the type
        switch (type) {
            case "showing":
                LocalDateTime showtimeStart = showtime.plusMinutes(10);
                LocalDateTime showtimeEnd = showtime.plusWeeks(1);
                movieShowings = movieShowingRepository.findAllByShowtimeBetween(
                        showtimeStart, showtimeEnd);
                break;
            case "upcoming":
                showtime = showtime.plusWeeks(1);
                movieShowings = movieShowingRepository.findAllByShowtimeAfter(showtime);
                break;
            case "other":
                movieShowings = movieShowingRepository.findAllByShowtimeBefore(showtime);
                break;
            default:
                throw new IllegalStateException("Illegal movie type specified.");
        }

        for (MovieShowing movieShowing : movieShowings) {
            Movie movie = movieShowing.getMovie();
            boolean repeated = false;

            // Check if the movie is only belongs to upcoming movie
            if (type == "upcoming") {
                LocalDateTime showtimeStart = LocalDateTime.now().plusMinutes(10);
                List<MovieShowing> mss = movieShowingRepository
                        .findAllByShowtimeBetween(showtimeStart, showtime);
                for (MovieShowing ms : mss) {
                    if (ms.getMovie().getId() == movie.getId()) {
                        repeated = true;
                        break;
                    }
                }
            }

            // Check if the movie is only belongs to other movie
            if (type == "other") {
                List<MovieShowing> mss = movieShowingRepository.findAllByShowtimeAfter(showtime);
                for (MovieShowing ms : mss) {
                    if (ms.getMovie().getId() == movie.getId()) {
                        repeated = true;
                        break;
                    }
                }
            }

            // Check if the movie is already added to the movieList
            for (MovieListDto m : movieList) {
                if (m.getId() == movie.getId()) {
                    repeated = true;
                    break;
                }
            }

            // Create a new movieListDto and add it to the movieList
            if (!repeated) {
                MovieListDto movieListDto = modelMapper.map(movie, MovieListDto.class);
                movieListDto.setAvgRating(getAvgRating(movie.getMovieReviews()));
                movieListDto.setNumOfMovieReviews(movie.getMovieReviews().size());
                movieList.add(movieListDto);
            }
        }
        return movieList;
    }

    private float getAvgRating(List<MovieReview> movieReviews) {
        if (movieReviews.size() > 0) {
            float sum = 0;
            for (MovieReview movieReview : movieReviews) {
                sum += movieReview.getRating();
            }
            return new BigDecimal(sum / movieReviews.size())
                    .setScale(1, RoundingMode.HALF_UP)
                    .floatValue();
        } else {
            return 0;
        }

    };

    public MovieDetailDto getMovieDetail(Long movieId) {
        List<MovieShowingDto> movieShowingDtos = new ArrayList<>();
        List<MovieShowing> weekMovieShowings = movieShowingRepository.findAllByShowtimeBetween(
                LocalDateTime.now().plusMinutes(10), LocalDateTime.now().plusWeeks(1));

        for (MovieShowing movieShowing : weekMovieShowings) {
            if (movieShowing.getMovie().getId() == movieId) {
                MovieShowingDto movieShowingDto = new MovieShowingDto();
                movieShowingDto.setId(movieShowing.getId());
                movieShowingDto.setShowtime(movieShowing.getShowtime());
                movieShowingDto.setHouseId(movieShowing.getHouse().getId());
                movieShowingDto.setCinemaId(movieShowing.getHouse().getCinema().getId());
                movieShowingDto.setMovieId(movieId);
                movieShowingDto.setOccupancyRate(movieShowing.getoccupancyRate());
                movieShowingDtos.add(movieShowingDto);
            }
        }
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException("Movie with ID " + movieId + " does not exists."));
        MovieDto movieDto = modelMapper.map(movie, MovieDto.class);
        MovieDetailDto movieDetailDto = new MovieDetailDto();
        movieDetailDto.setMovie(movieDto);
        movieDetailDto.setMovieShowings(movieShowingDtos);
        return movieDetailDto;
    }

}
