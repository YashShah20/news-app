import api from "./api";

const getTags = () => {
  return api.get("/tag");
};
const addTag = (tag) => {
  return api.post("/tag/add", tag);
};
const updateTag = (id, tag) => {
  return api.put(`/tag/update/${id}`, tag);
};
const deleteTag = (id) => {
  return api.delete(`/tag/delete/${id}`);
};

export { getTags, addTag, updateTag, deleteTag };
