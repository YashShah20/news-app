import api from "./api";

const getNewsTags = (news_id) => {
  return api.get(`/news/${news_id}/tags`);
};
const addNewsTags = (news_id, tags) => {
  return api.get(`/news/${news_id}/tags/add`, tags);
};
const deleteNewsTags = (news_id, tags) => {
  return api.get(`/news/${news_id}/tags/delete`, tags);
};

export { getNewsTags, addNewsTags, deleteNewsTags };
