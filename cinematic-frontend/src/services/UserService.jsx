import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/user/";

class UserService {
  login(loginInfo) {
    return axios.post("http://localhost:8080/api/login", loginInfo);
  }

  addUser(user) {
    return axios.post(USER_API_BASE_URL, user);
  }

}

export default new UserService();
