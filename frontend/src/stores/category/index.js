import { getCategories } from "@/services/categoryApi";

export default {
  namespaced: true,
  state() {
    return {
      localNewsCategory: {
        tag: "local-news",
        label: "Local news",
        to: { name: "local-news" },
      },
      allNewsCategory: {
        tag: "",
        label: "All news",
        to: { name: "news-list" },
      },
      categories: [],
      isLoading: false,
    };
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    setCategories(context, payload) {
      context.commit("setCategories", payload);
    },
    addLocalNewsCategory(context) {
      const payload = [
        context.state.localNewsCategory,
        ...context.getters.categories,
      ];
      context.commit("setCategories", payload);
    },
    removeLocalNewsCategory(context) {
      const payload = context.state.categories.slice(1);
      context.commit("setCategories", payload);
    },
    async init(context) {
      try {
        context.state.isLoading = true;
        const response = await getCategories();
        const categories = response.data;
        context.dispatch("setCategories", [
          context.state.allNewsCategory,
          ...categories,
        ]);

        const isLoggedIn = context.rootGetters.isLoggedIn;

        if (isLoggedIn) {
          context.dispatch("addLocalNewsCategory");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        context.state.isLoading = false;
      }
    },
  },
  getters: {
    categories(state) {
      return state.categories;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
};
