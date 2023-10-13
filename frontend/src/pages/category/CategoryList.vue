<template>
  <v-container >
    <div class="text-h5 font-weight-bold mb-4 text-center">Explore Categories</div>
    <v-row>
      <v-col
        v-for="category in categories"
        :key="category.title"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          :to="{ name: 'category-news', params: { category: category.tag } }"
        >
          <v-img
            :src="category.image_url"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="350"
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
  data: () => ({
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 6,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
  }),
  computed: {
    categories() {
      return this.$store.getters["category/categories"];
    },
  },
};
</script>

<style scoped></style>
