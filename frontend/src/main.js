import { createApp } from "vue";
import App from "./App.vue";
import store from "./stores/index";

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./router/index";

const router = createRouter({
  history: new createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
