import api from "./api";

const getGlobalNews = (page = 1) => {
  return api.get("/global-news/", {
    params: { page },
  });
};

const getGlobalNewsByCategory = (category, page = 1) => {
  return api.get(`/global-news/${category}`, {
    params: { page },
  });
};

export { getGlobalNews, getGlobalNewsByCategory };
