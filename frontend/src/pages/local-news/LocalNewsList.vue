<template>
  <infinite-scroll :load="fetchNews" :isLoading="isLoading">
    <news-item v-for="news_item in news" :key="news_item.id" :news="news_item">
      <template #location>
        <v-icon icon="mdi-map-marker" start> </v-icon>
        <span> {{ news_item.city }}, {{ news_item.country }} </span>
      </template>
      <template #actions>
        <v-card-actions>
          <v-btn
            background-color="grey darken-1"
            :to="{
              name: 'local-news-details',
              params: { news_id: news_item.id },
            }"
            >View more</v-btn
          >
          <v-btn icon="mdi-heart" color="black"></v-btn>
        </v-card-actions>
      </template>
    </news-item>
  </infinite-scroll>
  <div class="text-center text-h6" v-if="endOfList">no more news...</div>
  <news-form @add-news="addNews"></news-form>
</template>

<script>
import NewsForm from "@/components/local-news/NewsForm.vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import NewsItem from "@/components/news/NewsItem.vue";
import fetch from "@/mixins/fetch";
import { getLocalNews } from "@/services/localNewsApi";
export default {
  components: {
    NewsForm,
    NewsItem,
    InfiniteScroll,
  },
  mixins: [fetch],
  data() {
    return {
      news: [],
      page: 1,
      endOfList: false,
    };
  },
  created() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      if (this.endOfList) {
        return;
      }

      const callback = (news) => {
        if (news.length === 0) {
          this.endOfList = true;
          return;
        }

        this.news.push(...news);
        this.page++;
      };

      this._fetch(getLocalNews, [this.page], callback);
    },
    addNews(news_item) {
      this.news.push(news_item);
    },
  },
};
</script>

<style scoped></style>
