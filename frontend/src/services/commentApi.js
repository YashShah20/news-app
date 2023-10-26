import api from "@/services/api";

const getComments = async (news_id, parent_id = null) => {
  return api.get(`/news/${news_id}/comments`, { params: { parent_id } });
};

const addComment = async (news_id, parent_id = null, comment) => {
  return api.post(`/news/${news_id}/comments/add`, comment, {
    params: { parent_id },
  });
};

export { getComments, addComment };
