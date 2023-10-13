<template class="bg-blue-lighten-3">
  <the-header></the-header>
  <category-tabs></category-tabs>
  <v-container fluid class="mt-5 bg-grey-lighten-5">
    <router-view></router-view>
  </v-container>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import CategoryTabs from "@/components/CategoryTabs.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    CategoryTabs,
  },
  data() {
    return {
      tab: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>

<style></style>
