import Dummy from "../pages/Dummy.vue";
export default [
  {
    path: "/",
    redirect: "/dummy",
  },
  {
    path: "/dummy",
    component: Dummy,
  },
];
