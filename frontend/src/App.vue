<template>
  <v-app class="rounded rounded-md">
    <the-header></the-header>
    <v-container fluid>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
export default {
  name: "App",
  components: {
    TheHeader,
  },
};
</script>

<style></style>
