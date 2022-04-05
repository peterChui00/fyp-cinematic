import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api/order/";
/* const SEAT_API_BASE_URL = "http://localhost:8080/api/seat/"; */

class OrderService {
  occupySeats(seats) {
    return axios.patch("http://localhost:8080/api/occupySeat", seats);
  }

  addOrder(order) {
    return axios.post(ORDER_API_BASE_URL, order);
  }
}

export default new OrderService();
