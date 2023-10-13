<template>
  <news-item
    v-for="news_item in news"
    :key="news_item.id"
    :news="news_item"
  ></news-item>
  <add-news @add-news="addNews"></add-news>
</template>

<script>
import AddNews from "@/components/local-news/AddNews.vue";
import NewsItem from "@/components/news/NewsItem.vue";
import fetch from "@/mixins/fetch";
import { getLocalNews } from "@/services/localNewsApi";
export default {
  components: {
    AddNews,
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
