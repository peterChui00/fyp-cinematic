import axios from "axios";

const CINEMA_API_BASE_URL = "http://localhost:8080/api/cinema/";

class CinemaService {
  // *** Cinema functions ***

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

  // *** House functions ***

  getHousesByCinemaId(cinemaId) {
    return axios.get(CINEMA_API_BASE_URL + cinemaId + "/house");
  }

  deleteHouse(cinemaId, houseId) {
    return axios.delete(CINEMA_API_BASE_URL + cinemaId + "/house/" + houseId);
  }

  addHouse(cinemaId, house) {
    return axios.post(CINEMA_API_BASE_URL + cinemaId + "/house", house);
  }

  updateHouse(cinemaId, houseId, house) {
    return axios.put(CINEMA_API_BASE_URL + cinemaId + "/house/" + houseId, house);
  }
}
export default new CinemaService();
