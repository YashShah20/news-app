import api from "./api";

const signin = (credentials) => {
  return api.post("/users/signin", credentials);
};
const signup = (user) => {
  return api.post("/users/signup", user);
};
const changePassword = (credentials) => {
  return api.put("/users/change-password", credentials);
};
export { signin, signup, changePassword };
