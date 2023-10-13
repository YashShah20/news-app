<template>
  <v-toolbar color="grey-darken-4">
    <v-app-bar-nav-icon icon="mdi-newspaper" :to="{ name: 'home' }">
    </v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase">Argus News</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu location="center" v-if="isLoggedIn">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-account"> </v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            :title="`${user.first_name} ${user.last_name}`"
            :subtitle="user.email"
          >
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-btn
              class="cursor-pointer"
              prepend-icon="mdi-compass"
              variant="text"
              :to="{name:'category-list'}"
            >
              All Categories
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              class="cursor-pointer"
              prepend-icon="mdi-account"
              variant="text"
            >
              Profile
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn
              class="cursor-pointer"
              prepend-icon="mdi-logout"
              variant="text"
              @click="logout"
            >
              Logout
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <v-btn
      v-else
      :to="{ name: 'signin' }"
      class="ms-2 bg-white text-center"
      append-icon="mdi-login"
    >
      <span>Sign in</span>
    </v-btn>
  </v-toolbar>
</template>
<script>

export default {
  name: "the-header",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("signout");
      this.$router.replace({ name: "signin" });
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
