import api from "./api";

const getUpvote = async (news_id) => {
  return api.get(`/news/upvote/${news_id}`);
};

const upvoteNews = async (news_id) => {
  return api.post(`/news/upvote/${news_id}`);
};

const deleteUpvote = async (news_id) => {
  return api.delete(`/news/upvote/${news_id}/delete`);
};

export { getUpvote, upvoteNews, deleteUpvote };
