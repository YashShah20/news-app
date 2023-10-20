<template>
  <v-container>
    <div class="text-h5 font-weight-bold mb-4 text-center">
      Explore Categories
    </div>
    <div class="d-flex my-4">
      <v-progress-circular
        indeterminate
        centered
        class="mx-auto"
        v-if="isLoading"
      ></v-progress-circular>
    </div>
    <v-row>
      <v-col
        v-for="category in categories"
        :key="category.title"
        cols="12"
        sm="6"
        md="2"
      >
        <v-card
          :to="
            category.to || {
              name: 'category-news',
              params: { category: category.tag },
            }
          "
        >
          <v-img
            :src="category.image_url"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200"
            cover
          >
            <v-card-title
              class="text-white"
              v-text="category.label"
            ></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters["category/categories"];
    },
    isLoading() {
      return this.$store.getters["category/isLoading"];
    },
  },
};
</script>

<style scoped></style>
