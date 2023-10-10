import { createApp } from "vue";
import App from "./App.vue";
import store from "./stores/index";

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./router/index";

const router = createRouter({
  history: new createWebHashHistory(),
  routes,
});

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(store);
app.use(router);

app.mount("#app");
