import api from "./api";

export default {
  getTags() {
    return api.get("/tag");
  },
  addTag(tag) {
    return api.post("/tag/add", tag);
  },
  updateTag(id, tag) {
    return api.put(`/tag/update/${id}`, tag);
  },
  deleteTag(id) {
    return api.delete(`/tag/delete/${id}`);
  },
};
