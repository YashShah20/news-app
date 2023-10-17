<template>
  <news-item></news-item>
</template>

<script>
import NewsItem from '@/components/news/NewsItem.vue';
export default {
  name: "the-dummy",
  components: {
    NewsItem,
  },
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      tab: null,
      items: ["Global News", "Local News"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>
