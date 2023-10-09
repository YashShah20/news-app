import api from "./api";

export default {
  getNewsTags(news_id) {
    return api.get(`/news/${news_id}/tags`);
  },
  addNewsTags(news_id, tags) {
    return api.get(`/news/${news_id}/tags/add`, tags);
  },
  deleteNewsTags(news_id, tags) {
    return api.get(`/news/${news_id}/tags/delete`, tags);
  },
};
