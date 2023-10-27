<template>
  <div class="d-flex my-4" v-if="isLoading">
    <v-progress-circular
      indeterminate
      centered
      class="mx-auto"
    ></v-progress-circular>
  </div>
  <template v-else>
    <news-item :news="news" allow-upvote></news-item>
    <v-container>
      <the-reply :news_id="news_id" @add-comment="addComment"></the-reply>
      <v-chip
        variant="text"
        append-icon="mdi-chat"
        size="large"
        color="grey-darken-4"
      >
        <span class="text-h5">Comments</span>
      </v-chip>
      <div class="ml-4 mt-2 text-grey-darken-2">
        <span v-if="comments.length === 0"> Be the first to comment... </span>
        <span v-else> {{ comments.length }} comments </span>
      </div>
      <comment-box
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      ></comment-box>
    </v-container>
  </template>
</template>

<script>
import CommentBox from "@/components/comments/CommentBox.vue";
import Reply from "@/components/comments/Reply.vue";
import NewsItem from "@/components/news/NewsItem.vue";
import fetch from "@/mixins/fetch";
import { getComments } from "@/services/commentApi";
import { getNewsDetails } from "@/services/localNewsApi";
export default {
  name: "local-news-details",
  props: ["news_id"],
  mixins: [fetch],
  components: {
    CommentBox,
    "the-reply": Reply,
    NewsItem,
  },
  data() {
    return {
      news: {},
      comments: [],
    };
  },
  created() {
    this.fetchNewsDetails();
    this.fetchComments();
  },
  methods: {
    fetchComments() {
      const callback = (comments) => {
        this.comments = comments;
      };

      const params = [this.news_id];

      this._fetch(getComments, params, callback);
    },
    fetchNewsDetails() {
      const callback = (news) => {
        this.news = news;
      };

      const params = [this.news_id];

      this._fetch(getNewsDetails, params, callback);
    },
    addComment(comment) {
      this.comments.unshift(comment);
    },
  },
  watch: {
    news_id() {
      this.fetchNewsDetails();
      this.fetchComments();
    },
  },
};
</script>
