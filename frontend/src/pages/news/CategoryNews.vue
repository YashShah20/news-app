<template>
  <infinite-scroll :load="fetchNews" :isLoading="isLoading">
    <news-item v-for="news_item in news" :key="news_item.id" :news="news_item">
      <template #actions>
        <v-card-title>{{ news_item.source_name }}</v-card-title>
        <v-card-actions>
          <v-btn
            color="deep-purple-lighten-2"
            variant="text"
            :href="news_item.source_url"
            target="_blank"
          >
            read more
          </v-btn>
        </v-card-actions>
      </template>
    </news-item>
  </infinite-scroll>
</template>

<script>
import fetch from "@/mixins/fetch";
import { getGlobalNewsByCategory } from "@/services/globalNewsApi";
import NewsItem from "@/components/news/NewsItem.vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";

export default {
  mixins: [fetch],
  props: {
    category: String,
  },
  components: {
    NewsItem,
    InfiniteScroll,
  },
  created() {
    this.fetchNews();
  },
  data() {
    return {
      news: [],
      page: 1,
    };
  },
  methods: {
    fetchNews() {
      const callback = (news) => {
        this.news.push(...news);
        this.page++;
      };
      const params = [this.category, this.page];

      this._fetch(getGlobalNewsByCategory, params, callback);
    },
    clear() {
      this.news = [];
      this.page = 1;
    },
  },
  watch: {
    category() {
      this.clear();
      this.fetchNews();
    },
  },
};
</script>

<style scoped></style>
