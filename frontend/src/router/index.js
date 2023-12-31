import store from "@/stores/index";

import SignIn from "@/pages/user/SignIn.vue";
import SignUp from "@/pages/user/SignUp.vue";
import UserProfile from "@/pages/user/UserProfile.vue";

import CategoryList from "@/pages/category/CategoryList.vue";

import NewsList from "@/pages/news/NewsList.vue";
import CategoryNews from "@/pages/news/CategoryNews.vue";

import LocalNews from "@/pages/local-news/LocalNewsList.vue";
import LocalNewsDetails from "@/pages/local-news/LocalNewsDetails.vue";

import Insights from "@/pages/charts/Insights.vue";

import Dummy from "@/pages/Dummy.vue";
import PageNotFound from "@/pages/PageNotFound.vue";

export default [
  {
    path: "/",
    redirect: { name: "category-list" },
    name: "home",
  },
  {
    path: "/news",
    children: [
      {
        path: "",
        component: NewsList,
        name: "news-list",
      },
      {
        path: "local",
        beforeEnter: () => {
          const loggedIn = store.getters.isLoggedIn;
          if (!loggedIn) {
            return { name: "category-list" };
          }
        },
        children: [
          {
            path: "",
            component: LocalNews,
            name: "local-news",
          },
          {
            path: ":news_id",
            component: LocalNewsDetails,
            props: true,
            name: "local-news-details",
          },
        ],
      },
      {
        path: ":category",
        component: CategoryNews,
        props: true,
        name: "category-news",
      },
    ],
  },
  {
    path: "/categories",
    component: CategoryList,
    name: "category-list",
  },
  {
    path: "/profile",
    component: UserProfile,
    name: "user-profile",
    beforeEnter: () => {
      const loggedIn = store.getters.isLoggedIn;
      if (!loggedIn) {
        return { name: "category-list" };
      }
    },
  },
  {
    path: "/sign-in",
    component: SignIn,
    name: "signin",
  },
  {
    path: "/sign-up",
    component: SignUp,
    name: "signup",
  },
  {
    path: "/insights",
    component: Insights,
    name: "insights",
  },
  {
    path: "/dummy",
    component: Dummy,
    name: "dummy",
  },
  {
    path: "/page-not-found",
    component: PageNotFound,
    name: "notfound",
  },
  {
    path: "/:anything(.*)*",
    redirect: "/page-not-found",
  },
];
