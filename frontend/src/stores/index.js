import { createStore } from "vuex";
import categoryStore from "@/stores/category/index";
import locationStore from "@/stores/location/index";

const store = createStore({
  modules: {
    category: categoryStore,
    location: locationStore,
  },
  state() {
    return {
      user: {
        id: null,
        first_name: null,
        last_name: null,
        username: null,
        email: null,
        token: null,
      },
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    init(context) {
      const token = localStorage.token;
      if (!token) {
        return;
      }

      const user = {
        id: localStorage.id,
        first_name: localStorage.first_name,
        last_name: localStorage.last_name,
        username: localStorage.username,
        email: localStorage.email,
        token,
      };

      context.commit("setUser", user);
    },
    signin(context, payload) {
      Object.keys(payload).forEach((key) => {
        localStorage.setItem(key, payload[key]);
      });
      context.commit("setUser", payload);
      context.dispatch("category/addLocalNewsCategory");
    },
    signout(context) {
      context.commit("setUser", {});
      context.dispatch("category/removeLocalNewsCategory");
      localStorage.clear();
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return !!state.user.token;
    },
  },
});

export default store;
