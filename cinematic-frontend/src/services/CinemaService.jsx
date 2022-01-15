import axios from "axios";

const CINEMA_API_BASE_URL = "http://localhost:8080/api/cinema/";

class CinemaService {
  getCinemas() {
    return axios.get(CINEMA_API_BASE_URL);
  }

  getCinemaById(cinemaId) {
    return axios.get(CINEMA_API_BASE_URL, cinemaId);
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

  getHousesById(cinemaId) {
    return axios.get(CINEMA_API_BASE_URL + cinemaId + "/house");
  }

  deleteHouse(cinemaId, houseId) {
    return axios.delete(CINEMA_API_BASE_URL + cinemaId + "/house/" + houseId);
  }
}
export default new CinemaService();
