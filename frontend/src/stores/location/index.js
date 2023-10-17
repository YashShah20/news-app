import { getLocationByIP } from "@/services/location";

export default {
  namespaced: true,
  state() {
    return {
      location: { ip: null, city: null, country: null },
    };
  },
  mutations: {
    setLocation(state, location) {
      state.location = location;
    },
  },
  actions: {
    async init(context) {
      try {
        const location = await getLocationByIP();

        context.commit("setLocation", location);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  getters: {
    location(state) {
      return state.location;
    },
  },
};
