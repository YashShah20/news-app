import api from "./api";

getLocalNews = () => {
  return api.get("/news");
};

getNewsDetails = (id) => {
  return api.get(`/news/${id}`);
};

addLocalNews = (news) => {
  return api.post("/news/add", news);
};

updateLocalNews = (id, news) => {
  return api.put(`/news/update/${id}`, news);
};

deleteLocalNews = (id) => {
  return api.delete(`/news/delete/${id}`);
};

export {
  getLocalNews,
  getNewsDetails,
  addLocalNews,
  updateLocalNews,
  deleteLocalNews,
};
