import axios from "axios";

const MOVIE_API_BASE_URL = "http://localhost:8080/api/movie/";

class MovieService {
  getMovies() {
    return axios.get(MOVIE_API_BASE_URL);
  }

  getMovieById(movieId) {
    return axios.get(MOVIE_API_BASE_URL + movieId);
  }

  addMovie(movie) {
    return axios.post(MOVIE_API_BASE_URL, movie);
  }

  updateMovie(movieId, movie) {
    return axios.put(MOVIE_API_BASE_URL + movieId, movie);
  }

  deleteMovie(movieId) {
    return axios.delete(MOVIE_API_BASE_URL + movieId);
  }

  uploadPoster(movieTitle, posterFile) {
    return axios.post(
      MOVIE_API_BASE_URL + movieTitle + "/uploadPoster",
      posterFile,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  }

  getShowingMovies() {
    return axios.get(MOVIE_API_BASE_URL + "showing");
  }

  getUpcomingMovies() {
    return axios.get(MOVIE_API_BASE_URL + "upcoming");
  }

  getOtherMovies() {
    return axios.get(MOVIE_API_BASE_URL + "other");
  }

  getMovieDetail(movieId) {
    return axios.get(MOVIE_API_BASE_URL + movieId + "/detail");
  }

  getMovieReviewsByMovieId(movieId) {
    return axios.get(MOVIE_API_BASE_URL + movieId + "/movieReview");
  }

  addMovieReview(movieId, movieReview) {
    return axios.post(MOVIE_API_BASE_URL + movieId + "/movieReview", movieReview);
  }
}
export default new MovieService();
