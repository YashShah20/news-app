import api from "./api";

export default {
  getGlobalNews(page = 1) {
    return api.get("/global-news/", {
      params: { page },
    });
  },
  getGlobalNewsByCategory(category, page = 1) {
    return api.get(`/global-news/${category}`, {
      params: { page },
    });
  },
};
