<template>
  <v-container fluid>
    <v-card>
      <v-tabs bg-color="grey-lighten-2" show-arrows>
        <v-tab
          v-for="category in categoriesWithRoutes"
          :key="category.tag"
          :value="category.tag"
          :to="category.to"
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
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    categories() {
      return this.$store.getters["category/categories"];
    },
    categoriesWithRoutes() {
      return this.categories.map((category) => ({
        to: { name: "category-news", params: { category: category.tag } },
        ...category,
      }));
    },
  },
};
</script>

<style scoped></style>
