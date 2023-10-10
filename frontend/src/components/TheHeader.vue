<template>
  <v-app-bar color="primary" scroll-behavior="elevate">
    <v-app-bar-title>
      <v-btn size="large" prepend-icon="mdi-newspaper-variant" to="/">
        News App
      </v-btn>
    </v-app-bar-title>
    <template v-if="!isLoggedIn">
      <v-tabs align-tabs="end" hide-slider>
        <v-tab
          v-for="item in navItems"
          :key="item"
          :value="item.label"
          :to="item.to"
        >
          {{ item.label }}
        </v-tab>
      </v-tabs>
      <!-- <v-app-bar-nav-icon icon="mdi-logout"></v-app-bar-nav-icon> -->
      <!-- <v-app-bar-nav-icon icon="mdi-account"></v-app-bar-nav-icon> -->
    </template>
    <template v-else>
      <v-btn to="/dummy" style="background-color: teal" color="white">
        SIGN IN
      </v-btn>
    </template>
  </v-app-bar>
</template>
<script>
export default {
  name: "the-header",
  data() {
    return {
      navItems: [
        {
          label: "Local News",
          to: "/",
        },
        {
          label: "My News",
          to: "/",
        },
        {
          label: "Logout",
          to: "/",
        },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
