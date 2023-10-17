<template>
  <news-item v-for="news_item in news" :key="news_item.id" :news="news_item">
    <template #location>
      <v-icon icon="mdi-map-marker" start> </v-icon>
      <span> {{ news_item.city }}, {{ news_item.country }} </span>
    </template>
  </news-item>
  <news-form @add-news="addNews"></news-form>
</template>

<script>
import NewsForm from "@/components/local-news/NewsForm.vue";
import NewsItem from "@/components/news/NewsItem.vue";
import fetch from "@/mixins/fetch";
import { getLocalNews } from "@/services/localNewsApi";
export default {
  components: {
    NewsForm,
    NewsItem,
  },
  mixins: [fetch],
  data() {
    return {
      news: [],
    };
  },
  created() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      const callback = (news) => {
        this.news.push(...news);
      };

      this._fetch(getLocalNews, [], callback);
    },
    addNews(news_item) {
      this.news.push(news_item);
    },
  },
};
</script>

<style scoped></style>
