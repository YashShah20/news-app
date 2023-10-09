import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: {
        name: null,
        token: null,
      },
    };
  },
  mutations: {
    setUser(state, payload) {
      const { name, token } = payload;
      state.user.name = name;
      state.user.token = token;
    },
  },
  actions: {
    signin(context, payload) {
      context.commit("setUser", payload);
    },
    signout(context) {
      context.commit("setUser", { name: null, token: null });
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
