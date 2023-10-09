import api from "./api";

const signin = (credentials) => {
  return api.post("/users/signin", credentials);
};
const signup = (user) => {
  return api.post("/users/signup", user);
};
export { signin, signup };
