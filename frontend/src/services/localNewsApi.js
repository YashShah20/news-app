import api from "./api";

const getLocalNews = (page) => {
  return api.get("/news", { params: { page } });
};

const getNewsDetails = (id) => {
  return api.get(`/news/${id}`);
};

const addLocalNews = (news) => {
  return api.post("/news/add", news);
};

const updateLocalNews = (id, news) => {
  return api.put(`/news/update/${id}`, news);
};

const deleteLocalNews = (id) => {
  return api.delete(`/news/delete/${id}`);
};

export {
  getLocalNews,
  getNewsDetails,
  addLocalNews,
  updateLocalNews,
  deleteLocalNews,
};
