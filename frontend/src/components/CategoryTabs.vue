<template>
  <v-container fluid>
    <v-card>
      <v-tabs bg-color="grey-lighten-2" show-arrows v-model="tab">
        <v-tab
          v-for="category in categoriesWithRoutes"
          :key="category.tag"
          :value="category.tag"
          :to="category.to"
          :loading="isLoading"
          exact
        >
          <v-img :src="category.image_url" size="12"></v-img>
          {{ category.label }}
        </v-tab>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    categories() {
      return this.$store.getters["category/categories"];
    },
    isLoading() {
      return this.$store.getters["category/isLoading"];
    },
    categoriesWithRoutes() {
      return this.categories.map((category) => ({
        to: { name: "category-news", params: { category: category.tag } },
        ...category,
      }));
    },
  },
  watch: {
    $route(value) {
      if (!value.fullPath.includes("/news")) {
        this.tab = null;
      }
    },
  },
};
</script>

<style scoped></style>
