import axios from "axios";

import store from "../stores/index";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

api.interceptors.request.use((config) => {
  const { token } = store.getters.user;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
