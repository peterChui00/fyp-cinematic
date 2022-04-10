import axios from "axios";

const CINEMA_API_BASE_URL = "http://localhost:8080/api/cinema/";

class CinemaService {
  // *** Cinema functions ***

  getCinemas() {
    return axios.get(CINEMA_API_BASE_URL);
  }

  getCinemasByUsername(username) {
    return axios.get("http://localhost:8080/api/user/" + username + "/cinema");
  }

  getCinemaById(cinemaId) {
    return axios.get(CINEMA_API_BASE_URL + cinemaId);
  }

  addCinema(cinema) {
    return axios.post(CINEMA_API_BASE_URL, cinema, {
      headers: { "Content-Type": "application/json" },
    });
  }

  updateCinema(cinemaId, cinema) {
    return axios.put(CINEMA_API_BASE_URL + cinemaId, cinema, {
      headers: { "Content-Type": "application/json" },
    });
  }

  deleteCinema(cinemaId) {
    return axios.delete(CINEMA_API_BASE_URL + cinemaId);
  }

  // *** House functions ***

  getHousesByCinemaId(cinemaId) {
    return axios.get(CINEMA_API_BASE_URL + cinemaId + "/house");
  }

  getHouseById(cinemaId, houseId) {
    return axios.get(CINEMA_API_BASE_URL + cinemaId + "/house/" + houseId);
  }

  deleteHouse(cinemaId, houseId) {
    return axios.delete(CINEMA_API_BASE_URL + cinemaId + "/house/" + houseId);
  }

  addHouse(cinemaId, house) {
    return axios.post(CINEMA_API_BASE_URL + cinemaId + "/house", house);
  }

  updateHouse(cinemaId, houseId, house) {
    return axios.put(
      CINEMA_API_BASE_URL + cinemaId + "/house/" + houseId,
      house
    );
  }

  // *** Movie Showing functions ***

  getMovieShowingsByHouseId(cinemaId, houseId) {
    return axios.get(
      CINEMA_API_BASE_URL + cinemaId + "/house/" + houseId + "/movieShowing"
    );
  }

  getMovieShowingById(cinemaId, houseId, movieShowingId) {
    return axios.get(
      CINEMA_API_BASE_URL +
        cinemaId +
        "/house/" +
        houseId +
        "/movieShowing/" +
        movieShowingId
    );
  }

  getMovieShowing(movieShowingId) {
    return axios.get(
      "http://localhost:8080/api/movieShowing/" + movieShowingId
    );
  }

  getRecentMovieShowing() {
    return axios.get("http://localhost:8080/api/movieShowing/recent");
  }

  addMovieShowing(cinemaId, houseId, movieShowing) {
    return axios.post(
      CINEMA_API_BASE_URL + cinemaId + "/house/" + houseId + "/movieShowing",
      movieShowing
    );
  }

  updateMovieShowing(cinemaId, houseId, movieShowingId, movieShowing) {
    return axios.put(
      CINEMA_API_BASE_URL +
        cinemaId +
        "/house/" +
        houseId +
        "/movieShowing/" +
        movieShowingId,
      movieShowing
    );
  }

  deleteMovieShowing(cinemaId, houseId, movieShowingId) {
    return axios.delete(
      CINEMA_API_BASE_URL +
        cinemaId +
        "/house/" +
        houseId +
        "/movieShowing/" +
        movieShowingId
    );
  }
}
export default new CinemaService();
