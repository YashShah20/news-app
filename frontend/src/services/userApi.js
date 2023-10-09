import api from "./api";

export default {
  signin(credentials) {
    return api.post("/users/signin", credentials);
  },
  signup(user) {
    return api.post("/users/signup", user);
  },
};
